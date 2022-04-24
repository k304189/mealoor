import factory

from .favoriteStock import FavoriteStockFactory

class FavoriteStockCategoryFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.FavoriteStockCategory'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    favorite_stock = factory.SubFactory(FavoriteStockFactory)
    category = "肉"
    amount = 100
    unit = "g"
