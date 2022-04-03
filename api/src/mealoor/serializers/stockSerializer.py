from rest_framework import serializers
from django.db import transaction

from mealoor.models.stock import Stock
from mealoor.models.stockCategory import StockCategory
from .stockCategorySerializer import StockCategorySerializer

class StockSerializer(serializers.ModelSerializer):
    """Serializer for Stock object"""
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

    @transaction.atomic
    def update(self, instance, validated_data):
        request_stock_categories_data = validated_data.pop('categories')
        stock = super().update(instance, validated_data)
        # 画面上のカテゴリーのidを取得する
        request_stock_categories_id = set(list(
            map(lambda category: category['id'], request_stock_categories_data)
        ))

        # DBに登録されているカテゴリーのidを取得する
        db_stock_categories_id = set(list(
            instance.categories.all().values_list('id', flat=True)
        ))

        # 画面上入力された内容をDBに登録または更新する
        for request_stock_category_data in request_stock_categories_data:
            id = request_stock_category_data.pop('id')
            if len(request_stock_categories_data) == 1:
                request_stock_category_data['amount'] = stock.amount
                request_stock_category_data['unit'] = stock.unit
            # カテゴリー追加
            if id < 0:
                StockCategory.objects.create(stock=stock, **request_stock_category_data)
            else:
                # カテゴリー更新
                update_stock_category = StockCategory.objects.get(id=id)
                for key, value in request_stock_category_data.items():
                    setattr(update_stock_category, key, value)
                update_stock_category.save()

        # 画面上削除されたデータをDBから削除する
        delete_id_set = db_stock_categories_id.difference(request_stock_categories_id)

        for delete_id in delete_id_set:
            delete_stock_category = StockCategory.objects.get(id=delete_id)
            delete_stock_category.delete()

        return stock
