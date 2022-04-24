import factory
import datetime

from mealoor.models.favoriteStock import FavoriteStock
from .account import AccountFactory

class FavoriteStockFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.FavoriteStock'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    account = factory.SubFactory(AccountFactory)
    name = "test_data1"
    eat_type = "中食"
    food_type = "食材"
