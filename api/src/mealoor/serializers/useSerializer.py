from rest_framework import serializers

from mealoor.models.use import Use

class UseSerializer(serializers.ModelSerializer):
    """Serializer for Use object"""

    class Meta:
        model = Use
        fields = (
            'id',
            'date',
            'use_type',
            'rate',
            'note',
        )
        read_only_fields = ('id',)
