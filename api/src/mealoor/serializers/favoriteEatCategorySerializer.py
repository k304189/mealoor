from rest_framework import serializers

from mealoor.models.favoriteEatCategory import FavoriteEatCategory

class FavoriteEatCategorySerializer(serializers.ModelSerializer):
    """Serializer for EatCategory object"""
    id = serializers.IntegerField(required=False)

    class Meta:
        model = FavoriteEatCategory
        fields = ('id', 'category', 'amount', 'unit')
        read_only_fields = ('id',)
