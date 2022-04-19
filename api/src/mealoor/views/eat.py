from rest_framework import generics
from rest_framework import pagination
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction
from django.db.models import Case
from django.db.models import When

from mealoor.models import Use
from mealoor.models import Eat
from mealoor.serializers import EatSerializer

class EatPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return response.Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data,
        })

class ListDateEatView(generics.ListAPIView):
    """ Show Authentication Account's Body """
    serializer_class = EatSerializer
    pagination_class = EatPagination

    def get_queryset(self):
        date = self.kwargs['date']
        return Eat.objects.filter(
            account=self.request.user,
            date=date,
        ).annotate(custom_order=Case(
            When(eat_timing='朝食', then=1),
            When(eat_timing='昼食', then=2),
            When(eat_timing='夕食', then=3),
            When(eat_timing='間食', then=4),
        )).order_by('custom_order')

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

class DeleteEatView(APIView):
    """ Delete Authentication Account's Body """
    @transaction.atomic
    def delete(self, request, id):
        target_eat = Eat.objects.get(id=id)
        target_use = Use.objects.filter(created_eat=target_eat)

        try:
            target_use = Use.objects.get(created_eat=target_eat)
            target_use.stock.remain += target_use.rate
            target_use.stock.save()
        except Use.DoesNotExist:
            pass

        target_eat.delete()

        return response.Response(
            status=status.HTTP_204_NO_CONTENT
        )
