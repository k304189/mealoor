import factory

from .stock import StockFactory

class CookIngredientFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.CookIngredient'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    cook = factory.SubFactory(StockFactory)
    stock = factory.SubFactory(StockFactory)
    rate = 100
