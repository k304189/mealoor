import factory

from .eat import EatFactory

class EatCategoryFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.EatCategory'
        django_get_or_create = ('id',)

    id = factory.Sequence(lambda n: n)
    eat = factory.SubFactory(EatFactory)
    category = "肉"
    amount = 100
    unit = "g"
