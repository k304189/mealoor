import factory

from .stock import StockFactory

class StockCategoryFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.StockCategory'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    stock = factory.SubFactory(StockFactory)
    category = "肉"
    amount = 100
    unit = "g"
