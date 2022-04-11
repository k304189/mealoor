from rest_framework import generics
from rest_framework import response
from rest_framework import pagination

from mealoor.models import Use
from mealoor.models import Stock
from mealoor.serializers import UseSerializer

class UsePagination(pagination.PageNumberPagination):
    page_size = 5

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListUseView(generics.ListAPIView):
    """ List Stock Uses """
    serializer_class = UseSerializer
    pagination_class = UsePagination

    def get_queryset(self):
        stock_id = self.kwargs['stock_id']
        target_stock = Stock.objects.get=(id=stock_id)
        return Use.objects.filter(stock=target_stock).order_by('date')
