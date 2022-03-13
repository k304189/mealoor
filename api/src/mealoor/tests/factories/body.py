import factory
import datetime

from mealoor.models.body import Body
from .account import AccountFactory

class BodyFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Body'
        django_get_or_create = ('account', 'date')

    account = factory.SubFactory(AccountFactory)
    date = datetime.date.today()
    weight = 60
    fat_rate = 15.5
