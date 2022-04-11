from rest_framework import generics
from rest_framework import response
from rest_framework import pagination

from mealoor.models import Stock
from mealoor.models import CookIngredient
from mealoor.serializers import CookIngredientSerializer

class CookIngredientPagination(pagination.PageNumberPagination):
    page_size = 5

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListCookIngredientView(generics.ListAPIView):
    """ List Authentication Account's Stock """
    serializer_class = CookIngredientSerializer
    pagination_class = CookIngredientPagination
    def get_queryset(self):
        cook_id = self.kwargs['cook_id']
        target_cook = Stock.objects.get(id=cook_id)
        return CookIngredient.objects.filter(cook=target_cook).order_by('id')
