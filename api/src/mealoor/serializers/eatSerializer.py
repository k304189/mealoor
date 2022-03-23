from rest_framework import serializers

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
        read_only_fields = ('id',)

    def create(self, validated_data):
        eat_categories_data = validated_data.pop('categories')
        eat = Eat.objects.create(**validated_data)
        for eat_category_data in eat_categories_data:
            EatCategory.objects.create(eat=eat, **eat_category_data)
        return eat
