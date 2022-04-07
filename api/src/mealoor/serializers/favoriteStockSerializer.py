from rest_framework import serializers
from django.db import transaction

from mealoor.models.favoriteStock import FavoriteStock
from mealoor.models.favoriteStockCategory import FavoriteStockCategory
from .favoriteStockCategorySerializer import FavoriteStockCategorySerializer

class FavoriteStockSerializer(serializers.ModelSerializer):
    """Serializer for FavoriteStock object"""
    categories = FavoriteStockCategorySerializer(many=True)

    class Meta:
        model = FavoriteStock
        fields = (
            'id',
            'name',
            'eat_type',
            'food_type',
            'categories',
            'registered_name',
            'quantity',
            'shop',
            'price',
            'kcal',
            'amount',
            'unit',
            'protein',
            'lipid',
            'carbo',
            'note',
        )
        read_only_fields = ('id', 'categories')

    @transaction.atomic
    def create(self, validated_data):
        favorite_stock_categories_data = validated_data.pop('categories')
        favorite_stock = FavoriteStock.objects.create(**validated_data)
        for favorite_stock_category_data in favorite_stock_categories_data:
            id = favorite_stock_category_data.pop('id')
            if len(favorite_stock_categories_data) == 1:
                favorite_stock_category_data['amount'] = favorite_stock.amount
                favorite_stock_category_data['unit'] = favorite_stock.unit
            FavoriteStockCategory.objects.create(
                favorite_stock=favorite_stock,
                **favorite_stock_category_data
            )
        return favorite_stock

    @transaction.atomic
    def update(self, instance, validated_data):
        request_categories_data = validated_data.pop('categories')
        favorite_stock = super().update(instance, validated_data)
        # 画面上のカテゴリーのidを取得する
        request_categories_id = set(list(
            map(lambda category: category['id'], request_categories_data)
        ))

        # DBに登録されているカテゴリーのidを取得する
        db_stock_categories_id = set(list(
            instance.categories.all().values_list('id', flat=True)
        ))

        # 画面上入力された内容をDBに登録または更新する
        for request_category_data in request_categories_data:
            id = request_category_data.pop('id')
            if len(request_categories_data) == 1:
                request_category_data['amount'] = favorite_stock.amount
                request_category_data['unit'] = favorite_stock.unit
            # カテゴリー追加
            if id < 0:
                FavoriteStockCategory.objects.create(
                    favorite_stock=favorite_stock,
                    **request_category_data
                )
            else:
                # カテゴリー更新
                update_stock_category = FavoriteStockCategory.objects.get(id=id)
                for key, value in request_category_data.items():
                    setattr(update_stock_category, key, value)
                update_stock_category.save()

        # 画面上削除されたデータをDBから削除する
        delete_id_set = db_stock_categories_id.difference(request_categories_id)

        for delete_id in delete_id_set:
            delete_stock_category = FavoriteStockCategory.objects.get(id=delete_id)
            delete_stock_category.delete()

        return favorite_stock
