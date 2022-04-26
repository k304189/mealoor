from decimal import Decimal
from rest_framework import generics
from rest_framework import pagination
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction

from mealoor.models import Eat
from mealoor.models import EatCategory
from mealoor.models import FavoriteEat
from mealoor.models import FavoriteEatCategory
from mealoor.serializers import FavoriteEatSerializer

class FavoriteEatPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListFavoriteEatView(generics.ListAPIView):
    """ List Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    pagination_class = FavoriteEatPagination

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user).order_by('id')

class CreateFavoriteEatView(generics.CreateAPIView):
    """ Create Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateFavoriteEatView(generics.UpdateAPIView):
    """ Update Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user)

class DeleteFavoriteEatView(generics.DestroyAPIView):
    """ Delete Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user)

class CreateEatFromFavoriteEatView(APIView):
    """ Create Eat From Favorite Eat Data """
    @transaction.atomic
    def post(self, request, id):
        date = request.data['date']
        eat_timing = request.data['eat_timing']
        rate = request.data['rate']
        name = request.data['name']
        price = request.data['price']
        discounted = request.data['discounted']
        note = request.data['note']

        target_favorite_eat = FavoriteEat.objects.get(id=id)
        target_favorite_eat_categories = FavoriteEatCategory.objects.filter(
            favorite_eat=target_favorite_eat,
        )

        calced_rate = Decimal(str(rate / 100))

        create_eat = Eat(
            account=target_favorite_eat.account,
            name=name,
            eat_type=target_favorite_eat.eat_type,
            food_type=target_favorite_eat.food_type,
            date=date,
            eat_timing=eat_timing,
            shop=target_favorite_eat.shop,
            price=price,
            kcal=target_favorite_eat.kcal * calced_rate,
            amount=target_favorite_eat.amount * calced_rate,
            unit=target_favorite_eat.unit,
            protein=target_favorite_eat.protein * calced_rate,
            lipid=target_favorite_eat.lipid * calced_rate,
            carbo=target_favorite_eat.carbo * calced_rate,
            discounted=discounted,
            note=note,
        )

        create_eat.save()

        for favorite_eat_category in target_favorite_eat_categories:
            create_eat_category = EatCategory(
                eat=create_eat,
                category=favorite_eat_category.category,
                amount=favorite_eat_category.amount * calced_rate,
                unit=favorite_eat_category.unit
            )
            create_eat_category.save()

        return response.Response(
            status=status.HTTP_201_CREATED
        )
