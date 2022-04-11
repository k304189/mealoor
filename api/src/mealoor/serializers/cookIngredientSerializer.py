from rest_framework import serializers

from mealoor.models import CookIngredient
from .stockSerializer import StockSerializer

class CookIngredientSerializer(serializers.ModelSerializer):
    stock = StockSerializer()

    class Meta:
        model = CookIngredient
        fields = (
            'id',
            'rate',
            'stock',
        )
        read_only_fields = ('id', 'stock',)
