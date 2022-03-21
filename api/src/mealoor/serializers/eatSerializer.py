from rest_framework import serializers

from mealoor.models.eat import Eat

class EatSerializer(serializers.ModelSerializer):
    """Serializer for Eat object"""

    class Meta:
        model = Eat
        fields = (
            'id',
            'name',
            'eat_type',
            'food_type',
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
