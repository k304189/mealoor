from rest_framework import serializers
from django.db import transaction

from mealoor.models.favoriteEat import FavoriteEat
from mealoor.models.favoriteEatCategory import FavoriteEatCategory
from .favoriteEatCategorySerializer import FavoriteEatCategorySerializer

class FavoriteEatSerializer(serializers.ModelSerializer):
    """Serializer for FavoriteEat object"""
    categories = FavoriteEatCategorySerializer(many=True)

    class Meta:
        model = FavoriteEat
        fields = (
            'id',
            'name',
            'eat_type',
            'food_type',
            'categories',
            'registered_name',
            'amount_note',
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
        favorite_eat_categories_data = validated_data.pop('categories')
        favorite_eat = FavoriteEat.objects.create(**validated_data)
        for favorite_eat_category_data in favorite_eat_categories_data:
            id = favorite_eat_category_data.pop('id')
            if len(favorite_eat_categories_data) == 1:
                favorite_eat_category_data['amount'] = favorite_eat.amount
                favorite_eat_category_data['unit'] = favorite_eat.unit
            FavoriteEatCategory.objects.create(
                favorite_eat=favorite_eat,
                **favorite_eat_category_data
            )
        return favorite_eat

    @transaction.atomic
    def update(self, instance, validated_data):
        request_categories_data = validated_data.pop('categories')
        favorite_eat = super().update(instance, validated_data)
        # 画面上のカテゴリーのidを取得する
        request_categories_id = set(list(
            map(lambda category: category['id'], request_categories_data)
        ))

        # DBに登録されているカテゴリーのidを取得する
        db_eat_categories_id = set(list(
            instance.categories.all().values_list('id', flat=True)
        ))

        # 画面上入力された内容をDBに登録または更新する
        for request_category_data in request_categories_data:
            id = request_category_data.pop('id')
            if len(request_categories_data) == 1:
                request_category_data['amount'] = favorite_eat.amount
                request_category_data['unit'] = favorite_eat.unit
            # カテゴリー追加
            if id < 0:
                FavoriteEatCategory.objects.create(
                    favorite_eat=favorite_eat,
                    **request_category_data
                )
            else:
                # カテゴリー更新
                update_eat_category = FavoriteEatCategory.objects.get(id=id)
                for key, value in request_category_data.items():
                    setattr(update_eat_category, key, value)
                update_eat_category.save()

        # 画面上削除されたデータをDBから削除する
        delete_id_set = db_eat_categories_id.difference(request_categories_id)

        for delete_id in delete_id_set:
            delete_eat_category = FavoriteEatCategory.objects.get(id=delete_id)
            delete_eat_category.delete()

        return favorite_eat
