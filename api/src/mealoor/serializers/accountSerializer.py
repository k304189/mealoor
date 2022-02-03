from django.contrib.auth import get_user_model
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    """Serializer for user object"""

    class Meta:
        model = get_user_model()
        fields = (
            'email',
            'password',
            'username',
            'first_name',
            'last_name',
            'profile',
        )
        extra_kwargs = {'password' : {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        account = get_user_model().objects.create_user(**validated_data)

        return account

    def update(self, instance, validated_data):
        """Update a user, setting the password collectly and return it"""
        password = validated_data.pop('password', None)
        account = super().update(instance, validated_data)

        if password:
            account.set_password(password)
            account.save()

        return account
