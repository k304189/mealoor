from rest_framework import generics

from mealoor.models import Eat
from mealoor.serializers import EatSerializer

class ListDateEatView(generics.ListAPIView):
    """ Show Authentication Account's Body """
    serializer_class = EatSerializer

    def get_queryset(self):
        date = self.kwargs['date']
        return Eat.objects.filter(
            account=self.request.user,
            date=date,
        )

class CreateEatView(generics.CreateAPIView):
    """ Create Authentication Account's Body """
    serializer_class = EatSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateEatView(generics.UpdateAPIView):
    """ Update Authentication Account's Body """
    serializer_class = EatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Eat.objects.filter(account=self.request.user)

class DeleteEatView(generics.DestroyAPIView):
    """ Delete Authentication Account's Body """
    serializer_class = EatSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Eat.objects.filter(account=self.request.user)
