import factory
import datetime

from mealoor.models.stock import Stock
from .account import AccountFactory

class StockFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Stock'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    account = factory.SubFactory(AccountFactory)
    name = "test_data1"
    eat_type = "中食"
    food_type = "食材"
    limit = datetime.date.today()
    location = "常温"
