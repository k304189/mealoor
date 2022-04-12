from rest_framework import generics
from rest_framework import response
from rest_framework import status
from rest_framework import pagination
from rest_framework.views import APIView
from django.db import transaction

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
        target_stock = Stock.objects.get(id=stock_id)
        return Use.objects.filter(stock=target_stock).order_by('date')

class DeleteUseView(APIView):
    """ Delete Use, Update Stock remain or Delete Stock or Eat"""
    @transaction.atomic
    def delete(self, request, id):
        target_use = Use.objects.get(id=id)
        http_status = status.HTTP_400_BAD_REQUEST

        if target_use.use_type != "料理":
            target_use.stock.remain += target_use.rate
            target_use.stock.save()
            delete_success_flg = False

            if target_use.use_type == "食事":
                target_use.created_eat.delete()
                delete_success_flg = True
            elif target_use.use_type == "分割":
                target_use.created_stock.delete()
                delete_success_flg = True
            elif target_use.use_type == "処分":
                target_use.delete()
                delete_success_flg = True

            if delete_success_flg:
                http_status = status.HTTP_204_NO_CONTENT

        return response.Response(
            status=http_status
        )
