import datetime
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction
from django.db.models import Sum

from mealoor.models import Body
from mealoor.models import Eat

class ListDashboardView(APIView):
    """ List Dashboard Data """
    def get(self, request, date):
        target_datetime = datetime.datetime.strptime(date, '%Y-%m-%d')
        target_date = datetime.date(
            target_datetime.year,
            target_datetime.month,
            target_datetime.day,
        )
        last_month = target_date + datetime.timedelta(days=-30)

        eat_summary = Eat.objects.filter(
            date__range=[last_month, target_date]
        ).values(
            'date', 'eat_timing'
        ).annotate(
            kcal=Sum('kcal'), price=Sum('price')
        )

        bodies = Body.objects.filter(
            date__range=[last_month, target_date]
        ).values()

        label = []

        kcal_bre = []
        kcal_lun = []
        kcal_din = []
        kcal_sna = []

        price_bre = []
        price_lun = []
        price_din = []
        price_sna = []

        body_weight = []
        body_fat_rate = []
        body_fat_weight = []

        for i in range(-30, 1):
            d = target_date + datetime.timedelta(days=i)

            date_eats = list(filter(lambda x: x['date'] == d, eat_summary))
            date_weights = list(filter(lambda x: x['date'] == d, bodies))

            bre_eat_kcal = None
            bre_eat_price = None
            lun_eat_kcal = None
            lun_eat_price = None
            din_eat_kcal = None
            din_eat_price = None
            sna_eat_kcal = None
            sna_eat_price = None

            b_w_weight = None
            b_w_fat_rate = None
            b_w_fat_weight = None

            if len(date_eats) > 0:
                bre_eats = list(filter(lambda x: x['eat_timing'] == '朝食', date_eats))
                if len(bre_eats) > 0:
                    bre_eat_kcal = bre_eats[0]['kcal']
                    bre_eat_price = bre_eats[0]['price']

                lun_eats = list(filter(lambda x: x['eat_timing'] == '昼食', date_eats))
                if len(lun_eats) > 0:
                    lun_eat_kcal = lun_eats[0]['kcal']
                    lun_eat_price = lun_eats[0]['price']

                din_eats = list(filter(lambda x: x['eat_timing'] == '夕食', date_eats))
                if len(din_eats) > 0:
                    din_eat_kcal = din_eats[0]['kcal']
                    din_eat_price = din_eats[0]['price']

                sna_eats = list(filter(lambda x: x['eat_timing'] == '間食', date_eats))
                if len(sna_eats) > 0:
                    sna_eat_kcal = sna_eats[0]['kcal']
                    sna_eat_price = sna_eats[0]['price']

            if len(date_weights) > 0:
                b_w_weight = date_weights[0]['weight']
                b_w_fat_rate = date_weights[0]['fat_rate']
                b_w_fat_weight = date_weights[0]['fat_weight']

            label.append(d)

            kcal_bre.append(bre_eat_kcal)
            kcal_lun.append(lun_eat_kcal)
            kcal_din.append(din_eat_kcal)
            kcal_sna.append(sna_eat_kcal)

            price_bre.append(bre_eat_price)
            price_lun.append(lun_eat_price)
            price_din.append(din_eat_price)
            price_sna.append(sna_eat_price)

            body_weight.append(b_w_weight)
            body_fat_rate.append(b_w_fat_rate)
            body_fat_weight.append(b_w_fat_weight)

        response_data = {
            'label': label,
            'eat_summary': {
                'kcal': {
                    'breakfast': kcal_bre,
                    'lunch': kcal_lun,
                    'dinner': kcal_din,
                    'snack': kcal_sna,
                },
                'price': {
                    'breakfast': price_bre,
                    'lunch': price_lun,
                    'dinner': price_din,
                    'snack': price_sna,
                },
            },
            'body': {
                'weight': body_weight,
                'fat_rate': body_fat_rate,
                'fat_weight': body_fat_weight,
            },
        }

        return response.Response(
            data=response_data,
            status=status.HTTP_200_OK
        )
