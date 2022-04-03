from rest_framework import serializers
from django.db import transaction

from mealoor.models.stock import Stock
from mealoor.models.stockCategory import StockCategory
from .stockCategorySerializer import StockCategorySerializer

class StockSerializer(serializers.ModelSerializer):
    """Serializer for Eat object"""
    categories = StockCategorySerializer(many=True)

    class Meta:
        model = Stock
        fields = (
            'id',
            'name',
            'eat_type',
            'food_type',
            'categories',
            'limit',
            'location',
            'quantity',
            'remain',
            'shop',
            'price',
            'kcal',
            'amount',
            'unit',
            'protein',
            'lipid',
            'carbo',
            'discounted',
            'note',
        )
        read_only_fields = ('id', 'categories', 'remain')

    @transaction.atomic
    def create(self, validated_data):
        stock_categories_data = validated_data.pop('categories')
        stock = Stock.objects.create(**validated_data)
        for stock_category_data in stock_categories_data:
            id = stock_category_data.pop('id')
            if len(stock_categories_data) == 1:
                stock_category_data['amount'] = stock.amount
                stock_category_data['unit'] = stock.unit
            StockCategory.objects.create(
                stock=stock,
                **stock_category_data
            )
        return stock
