from rest_framework import generics
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response

from mealoor.serializers import AccountSerializer, AuthTokenSerializer

class CreateAccountView(APIView):
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            create_user = serializer.save()
            create_user_token = Token.objects.get(user=create_user)
            return_data = {
                'account': serializer.data,
                'token': create_user_token.key
            }
            return Response(
                return_data, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

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
