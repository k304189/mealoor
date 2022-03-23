from rest_framework import serializers

from mealoor.models.eatCategory import EatCategory

class EatCategorySerializer(serializers.ModelSerializer):
    """Serializer for EatCategory object"""

    class Meta:
        model = EatCategory
        fields = ('id', 'category', 'amount', 'unit')
        read_only_fields = ('id',)
