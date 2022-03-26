import factory
import datetime

from mealoor.models.eat import Eat
from .account import AccountFactory

class EatFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Eat'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    account = factory.SubFactory(AccountFactory)
    date = datetime.date.today()
    name = "test_data1"
    eat_type = "中食"
    food_type = "食材"
    eat_timing = "間食"
