from decimal import Decimal
from rest_framework import generics
from rest_framework import pagination
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction

from mealoor.models import Stock
from mealoor.models import StockCategory
from mealoor.models import FavoriteStock
from mealoor.models import FavoriteStockCategory
from mealoor.serializers import FavoriteStockSerializer

class FavoriteStockPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListFavoriteStockView(generics.ListAPIView):
    """ List Authentication Account's FavoriteStock """
    serializer_class = FavoriteStockSerializer
    pagination_class = FavoriteStockPagination

    def get_queryset(self):
        return FavoriteStock.objects.filter(account=self.request.user)

class CreateFavoriteStockView(generics.CreateAPIView):
    """ Create Authentication Account's FavoriteStock """
    serializer_class = FavoriteStockSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateFavoriteStockView(generics.UpdateAPIView):
    """ Update Authentication Account's FavoriteStock """
    serializer_class = FavoriteStockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteStock.objects.filter(account=self.request.user)

class DeleteFavoriteStockView(generics.DestroyAPIView):
    """ Delete Authentication Account's FavoriteStock """
    serializer_class = FavoriteStockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteStock.objects.filter(account=self.request.user)

class CreateStockFromFavoriteStockView(APIView):
    """ Create Stock From Favorite Stock Data """
    @transaction.atomic
    def post(self, request, id):
        limit = request.data['date']
        location = request.data['location']
        rate = request.data['rate']
        name = request.data['name']
        price = request.data['price']
        discounted = request.data['discounted']
        note = request.data['note']

        target_favorite_stock = FavoriteStock.objects.get(id=id)
        target_favorite_stock_categories = FavoriteStockCategory.objects.filter(
            favorite_stock=target_favorite_stock,
        )

        calced_rate = Decimal(str(rate / 100))

        create_stock = Stock(
            account=target_favorite_stock.account,
            name=name,
            eat_type=target_favorite_stock.eat_type,
            food_type=target_favorite_stock.food_type,
            limit=limit,
            location=location,
            quantity=target_favorite_stock.quantity,
            shop=target_favorite_stock.shop,
            price=price,
            kcal=target_favorite_stock.kcal * calced_rate,
            amount=target_favorite_stock.amount * calced_rate,
            unit=target_favorite_stock.unit,
            protein=target_favorite_stock.protein * calced_rate,
            lipid=target_favorite_stock.lipid * calced_rate,
            carbo=target_favorite_stock.carbo * calced_rate,
            discounted=discounted,
            note=note,
        )

        create_stock.save()

        for favorite_stock_category in target_favorite_stock_categories:
            create_stock_category = StockCategory(
                stock=create_stock,
                category=favorite_stock_category.category,
                amount=favorite_stock_category.amount * calced_rate,
                unit=favorite_stock_category.unit
            )
            create_stock_category.save()

        return response.Response(
            status=status.HTTP_201_CREATED
        )
