import factory
import datetime

from .stock import StockFactory

class UseFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Use'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    stock = factory.SubFactory(StockFactory)
    use_type = '処分'
    date = datetime.date.today()
    rate = 100
