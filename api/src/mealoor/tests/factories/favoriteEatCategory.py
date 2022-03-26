import factory

from .favoriteEat import FavoriteEatFactory

class FavoriteEatCategoryFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.FavoriteEatCategory'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    eat = factory.SubFactory(FavoriteEatFactory)
    category = "肉"
    amount = 100
    unit = "g"
