import datetime
from decimal import Decimal
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction

from mealoor.models import Stock
from mealoor.models import StockCategory
from mealoor.models import Eat
from mealoor.models import EatCategory
from mealoor.models import Use
from mealoor.models import CookIngredient

class CreateCookStockView(APIView):
    """ Create Cook Stock and Eat Created Stock """
    @transaction.atomic
    def post(self, request):
        name = request.data['name']
        limit = request.data['limit']
        location = request.data['location']
        ingredients = request.data['ingredients']
        date = request.data.get('date')
        eat_timing = request.data.get('eat_timing')
        eat_rate = request.data.get('rate')

        cook = Stock(
            account=request.user,
            name=name,
            eat_type="自炊",
            food_type="料理",
            shop="自宅",
            limit=limit,
            location=location,
            unit="g",
            note="",
        )
        cook_categories = []
        cook_ingredients = []

        for ingredient in ingredients:
            rate = ingredient['rate']
            calced_rate = Decimal(rate / 100)
            ing_stock = Stock.objects.get(id=ingredient['id'])
            ing_stock_categories = StockCategory.objects.filter(stock=ing_stock)

            cook.price += ing_stock.price * calced_rate
            cook.kcal += ing_stock.kcal * calced_rate
            cook.protein = Decimal(cook.protein) + (ing_stock.protein * calced_rate)
            cook.lipid = Decimal(cook.lipid) + (ing_stock.lipid * calced_rate)
            cook.carbo = Decimal(cook.carbo) + (ing_stock.carbo * calced_rate)
            if ing_stock.unit == "g":
                cook.amount += ing_stock.amount * calced_rate

            ing_stock.remain -= rate
            ing_stock.save()

            for ing_stock_category in ing_stock_categories:
                target_category_list = list(
                    filter(
                        lambda c: c.category == ing_stock_category.category, cook_categories
                    )
                )
                if len(target_category_list) <= 0:
                    cook_category = StockCategory(
                        stock=cook,
                        category=ing_stock_category.category,
                        amount=ing_stock_category.amount * calced_rate,
                        unit=ing_stock_category.unit,
                    )
                    cook_categories.append(cook_category)
                else:
                    target_category_list[0].amount += ing_stock_category.amount * calced_rate

                cook_ingredient = CookIngredient(
                    cook=cook,
                    stock=ing_stock,
                    rate=rate,
                )
                cook_ingredients.append(cook_ingredient)

            Use(
                stock=ing_stock,
                use_type="料理",
                date=datetime.date.today(),
                rate=rate,
                note=name,
            ).save()

        cook.save()
        StockCategory.objects.bulk_create(cook_categories)
        CookIngredient.objects.bulk_create(cook_ingredients)

        eat_cook_categories = []
        if date and eat_timing and eat_rate:
            calced_eat_rate = Decimal(eat_rate / 100)
            cook_eat = Eat(
                account=cook.account,
                name=cook.name,
                eat_type=cook.eat_type,
                food_type=cook.food_type,
                date=date,
                eat_timing=eat_timing,
                shop=cook.shop,
                price=cook.price * calced_eat_rate,
                kcal=cook.kcal * calced_eat_rate,
                amount=cook.amount * calced_eat_rate,
                unit=cook.unit,
                protein=cook.protein * calced_eat_rate,
                lipid=cook.lipid * calced_eat_rate,
                carbo=cook.carbo * calced_eat_rate,
            )
            cook_eat.save()

            for cook_category in cook_categories:
                eat_cook_category = EatCategory(
                    eat=cook_eat,
                    category=cook_category.category,
                    amount=cook_category.amount * calced_eat_rate,
                    unit=cook_category.unit
                )
                eat_cook_categories.append(eat_cook_category)
            EatCategory.objects.bulk_create(eat_cook_categories)

            cook.remain -= eat_rate
            cook.save()

            Use(
                stock=cook,
                use_type="食事",
                date=date,
                rate=eat_rate,
                note=cook.name,
            ).save()

        return response.Response(
            status=status.HTTP_201_CREATED
        )

class CancelCookStockView(APIView):
    """ Delete Cook Stock and Restore CookIngredient Remain """
    @transaction.atomic
    def delete(self, request, cook_id):
        target_cook = Stock.objects.get(id=cook_id)
        http_status = status.HTTP_400_BAD_REQUEST

        if target_cook.remain == 100 and target_cook.food_type == "料理" and target_cook.eat_type == "自炊":
            cookIngredients = CookIngredient.objects.filter(cook=target_cook)
            for cookIngredient in cookIngredients:
                stock = Stock.objects.get(id=cookIngredient.stock.id)
                stock.remain += cookIngredient.rate
                stock.save()

            target_cook.delete()
            http_status = status.HTTP_204_NO_CONTENT

        return response.Response(
            status=http_status
        )
