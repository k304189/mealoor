from rest_framework import serializers

from mealoor.models.body import Body
from .accountSerializer import AccountSerializer

class BodySerializer(serializers.ModelSerializer):
    """Serializer for body object"""

    class Meta:
        model = Body
        fields = ('date', 'weight', 'fat_rate', 'fat_weight')
        read_only_fields = ('fat_weight',)

    def update(self, instance, validated_data):
        """Update Body"""
        date = validated_data.pop('date', None)
        body = super().update(instance, validated_data)

        return body
