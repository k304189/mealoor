from rest_framework import generics
from rest_framework import pagination
from rest_framework import response

from mealoor.models import FavoriteEat
from mealoor.serializers import FavoriteEatSerializer

class FavoriteEatPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'current_page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListFavoriteEatView(generics.ListAPIView):
    """ List Authentication Account's FavoriteEat """
    serializer_class = FavoriteEatSerializer
    pagination_class = FavoriteEatPagination

    def get_queryset(self):
        return FavoriteEat.objects.filter(account=self.request.user)

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
