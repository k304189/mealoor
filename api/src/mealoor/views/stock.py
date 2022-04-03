from rest_framework import generics

from mealoor.models import Stock
from mealoor.serializers import StockSerializer

class CreateStockView(generics.CreateAPIView):
    """ Create Authentication Account's Stock """
    serializer_class = StockSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)
