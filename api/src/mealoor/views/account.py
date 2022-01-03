from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from mealoor.serializers import AccountSerializer, AuthTokenSerializer

class CreateAccountView(generics.CreateAPIView):
    """Create a new account in the system"""
    serializer_class = AccountSerializer

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for account, restrict who can see Todo"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageAccountView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated account"""
    serializer_class = AccountSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user
