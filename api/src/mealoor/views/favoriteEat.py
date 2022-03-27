from rest_framework import generics

from mealoor.models import FavoriteEat
from mealoor.serializers import FavoriteEatSerializer

class CreateFavoriteEatView(generics.CreateAPIView):
    """ Create Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateFavoriteEatView(generics.UpdateAPIView):
    """ Update Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user)

class DeleteFavoriteEatView(generics.DestroyAPIView):
    """ Delete Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user)
