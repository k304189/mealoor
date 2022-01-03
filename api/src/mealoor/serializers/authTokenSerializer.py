from django.contrib.auth import authenticate
from rest_framework import serializers

class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style = { 'input_type' : 'password' },
        trim_whitespace = False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        account = authenticate(
            request = self.context.get('request'),
            username = email,
            password = password
        )
        if not account:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code = 'authentication')

        attrs['user'] = account
        return attrs
