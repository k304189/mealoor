from rest_framework import serializers

from mealoor.models.favoriteStockCategory import FavoriteStockCategory

class FavoriteStockCategorySerializer(serializers.ModelSerializer):
    """Serializer for EatCategory object"""
    id = serializers.IntegerField(required=False)

    class Meta:
        model = FavoriteStockCategory
        fields = ('id', 'category', 'amount', 'unit')
        read_only_fields = ('id',)
