from rest_framework import generics
from rest_framework import pagination
from rest_framework import response

from mealoor.models import Stock
from mealoor.serializers import StockSerializer

class StockPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListStockView(generics.ListAPIView):
    """ List Authentication Account's Stock """
    serializer_class = StockSerializer
    pagination_class = StockPagination

    def get_queryset(self):
        return Stock.objects.filter(
            account=self.request.user,
            remain__gt='0',
        ).order_by('limit')

class CreateStockView(generics.CreateAPIView):
    """ Create Authentication Account's Stock """
    serializer_class = StockSerializer

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)

class UpdateStockView(generics.UpdateAPIView):
    """ Update Authentication Account's Stock """
    serializer_class = StockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Stock.objects.filter(account=self.request.user)

class DeleteStockView(generics.DestroyAPIView):
    """ Delete Authentication Account's Stock """
    serializer_class = StockSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Stock.objects.filter(account=self.request.user)
