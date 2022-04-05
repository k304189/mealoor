from decimal import Decimal
from rest_framework import generics
from rest_framework import pagination
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction

from mealoor.models import Stock
from mealoor.models import StockCategory
from mealoor.models import Eat
from mealoor.models import EatCategory
from mealoor.models import Use
from mealoor.serializers import StockSerializer

class StockPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListStockView(generics.ListAPIView):
    """ List Authentication Account's Stock """
    serializer_class = StockSerializer
    pagination_class = StockPagination

    def get_queryset(self):
        return Stock.objects.filter(
            account=self.request.user,
            remain__gt='0',
        ).order_by('limit')

class CreateStockView(generics.CreateAPIView):
    """ Create Authentication Account's Stock """
    serializer_class = StockSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateStockView(generics.UpdateAPIView):
    """ Update Authentication Account's Stock """
    serializer_class = StockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Stock.objects.filter(account=self.request.user)

class DeleteStockView(generics.DestroyAPIView):
    """ Delete Authentication Account's Stock """
    serializer_class = StockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Stock.objects.filter(account=self.request.user)

class UseStockView(APIView):
    """ Minus Stock Remain and Create Use Data """
    @transaction.atomic
    def post(self, request, id):
        date = request.data['date']
        use_type = request.data['use_type']
        rate = int(request.data['rate'])
        note = request.data['note']
        calced_rate = Decimal(str(rate / 100))

        use_type_name_dict = {
            'trash': '処分',
            'divide': '分割',
            'eat': '食事',
        }

        target_stock = Stock.objects.get(id=id)
        target_stock_categories = StockCategory.objects.filter(stock=target_stock)
        target_stock.remain -= rate
        target_stock.save()

        use_type_name = use_type_name_dict[use_type]
        Use(
            stock=target_stock,
            use_type=use_type_name,
            date=date,
            rate=rate,
            note=note,
        ).save()

        if use_type == 'divide':
            target_stock.id = None
            target_stock.remain = 100
            target_stock.quantity = 1
            target_stock.price *= calced_rate
            target_stock.kcal *= calced_rate
            target_stock.amount *= calced_rate
            target_stock.protein *= calced_rate
            target_stock.lipid *= calced_rate
            target_stock.carbo *= calced_rate
            target_stock.note += '\r\n' + note

            target_stock.save()

            for stock_category in target_stock_categories:
                StockCategory(
                    stock=target_stock,
                    category=stock_category.category,
                    amount=stock_category.amount * calced_rate,
                    unit=stock_category.unit
                ).save()

        elif use_type == 'eat':
            create_eat = Eat(
                account=target_stock.account,
                name=target_stock.name,
                eat_type=target_stock.eat_type,
                food_type=target_stock.food_type,
                date=date,
                eat_timing=request.data['eat_timing'],
                shop=target_stock.shop,
                price=target_stock.price * calced_rate,
                kcal=target_stock.kcal * calced_rate,
                amount=target_stock.amount * calced_rate,
                unit=target_stock.unit,
                protein=target_stock.protein * calced_rate,
                lipid=target_stock.lipid * calced_rate,
                carbo=target_stock.carbo * calced_rate,
                discounted=target_stock.discounted,
                note=target_stock.note + '\r\n' + note,
            )
            create_eat.save()

            for stock_category in target_stock_categories:
                EatCategory(
                    eat=create_eat,
                    category=stock_category.category,
                    amount=stock_category.amount * calced_rate,
                    unit=stock_category.unit,
                ).save()

        return response.Response({
            'status': status.HTTP_201_CREATED
        })
