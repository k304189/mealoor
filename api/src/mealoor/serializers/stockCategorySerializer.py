from rest_framework import serializers

from mealoor.models.stockCategory import StockCategory

class StockCategorySerializer(serializers.ModelSerializer):
    """Serializer for EatCategory object"""
    id = serializers.IntegerField(required=False)

    class Meta:
        model = StockCategory
        fields = ('id', 'category', 'amount', 'unit')
        read_only_fields = ('id',)
