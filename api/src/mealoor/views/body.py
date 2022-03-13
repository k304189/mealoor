from rest_framework import generics

from mealoor.models import Body
from mealoor.serializers import BodySerializer

class ShowBodyView(generics.RetrieveAPIView):
    """ Show Authentication Account's Body """
    serializer_class = BodySerializer
    lookup_field = 'date'

    def get_queryset(self):
        return Body.objects.filter(account=self.request.user)

class CreateBodyView(generics.CreateAPIView):
    """ Create Authentication Account's Body """
    serializer_class = BodySerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateBodyView(generics.UpdateAPIView):
    """ Update Authentication Account's Body """
    serializer_class = BodySerializer
    lookup_field = 'date'

    def get_queryset(self):
        return Body.objects.filter(account=self.request.user)

class DeleteBodyView(generics.DestroyAPIView):
    """ Delete Authentication Account's Body """
    serializer_class = BodySerializer
    lookup_field = 'date'

    def get_queryset(self):
        return Body.objects.filter(account=self.request.user)
