import factory
import datetime

from mealoor.models.eat import Eat
from .account import AccountFactory

class EatFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Eat'
        django_get_or_create = ('account', 'date')

    account = factory.SubFactory(AccountFactory)
    date = datetime.date.today()
    name = "test_data1"
    eat_type = "自炊"
    food_type = "料理"
    eat_timing = "朝食"
