import factory
import datetime

from mealoor.models.favoriteEat import FavoriteEat
from .account import AccountFactory

class FavoriteEatFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.FavoriteEat'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    account = factory.SubFactory(AccountFactory)
    name = "test_data1"
    eat_type = "中食"
    food_type = "食材"
    
