from rest_framework import serializers
from django.db import transaction

from mealoor.models.eat import Eat
from mealoor.models.eatCategory import EatCategory
from .eatCategorySerializer import EatCategorySerializer

class EatSerializer(serializers.ModelSerializer):
    """Serializer for Eat object"""
    categories = EatCategorySerializer(many=True)

    class Meta:
        model = Eat
        fields = (
            'id',
            'name',
            'eat_type',
            'food_type',
            'categories',
            'date',
            'eat_timing',
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
        read_only_fields = ('id', 'categories')

    @transaction.atomic
    def create(self, validated_data):
        eat_categories_data = validated_data.pop('categories')
        eat = Eat.objects.create(**validated_data)
        for eat_category_data in eat_categories_data:
            id = eat_category_data.pop('id')
            if len(eat_categories_data) == 1:
                eat_category_data['amount'] = eat.amount
                eat_category_data['unit'] = eat.unit
            EatCategory.objects.create(eat=eat, **eat_category_data)
        return eat

    @transaction.atomic
    def update(self, instance, validated_data):
        request_eat_categories_data = validated_data.pop('categories')
        eat = super().update(instance, validated_data)
        # 画面上のカテゴリーのidを取得する
        request_eat_categories_id = set(list(
            map(lambda category: category['id'], request_eat_categories_data)
        ))

        # DBに登録されているカテゴリーのidを取得する
        db_eat_categories_id = set(list(
            instance.categories.all().values_list('id', flat=True)
        ))

        # 画面上入力された内容をDBに登録または更新する
        for request_eat_category_data in request_eat_categories_data:
            id = request_eat_category_data.pop('id')
            if len(request_eat_categories_data) == 1:
                request_eat_category_data['amount'] = eat.amount
                request_eat_category_data['unit'] = eat.unit
            # カテゴリー追加
            if id < 0:
                EatCategory.objects.create(eat=eat, **request_eat_category_data)
            else:
                # カテゴリー更新
                update_eat_category = EatCategory.objects.get(id=id)
                for key, value in request_eat_category_data.items():
                    setattr(update_eat_category, key, value)
                update_eat_category.save()

        # 画面上削除されたデータをDBから削除する
        delete_id_set = db_eat_categories_id.difference(request_eat_categories_id)

        for delete_id in delete_id_set:
            delete_eat_category = EatCategory.objects.get(id=delete_id)
            delete_eat_category.delete()

        return eat
