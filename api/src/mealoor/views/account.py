from rest_framework import generics
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response

from mealoor.models import Account
from mealoor.serializers import AccountSerializer, AuthTokenSerializer

class ShowAccountView(generics.ListAPIView):
    """Show Authentication Account"""
    serializer_class = AccountSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        """Return Authentication User"""
        user = self.request.user
        return Account.objects.filter(id=user.id)

class CreateAccountView(APIView):
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            create_user = serializer.save()
            create_user_token = Token.objects.get(user=create_user)
            return_data = {
                'username': create_user.username,
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
    """Create a new auth token for account"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username
        })

class DeleteTokenView(APIView):
    """Delete auth token for sign in account"""
    serializer_class = AccountSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def delete(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ManageAccountView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated account"""
    serializer_class = AccountSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user

class WithdrawAccountView(APIView):
    """
        Withdraw sign in account
        Update is_active False
    """
    serializer_class = AccountSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def delete(self, request, format=None):
        request.user.is_active = False
        request.user.save()
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
