import factory

from mealoor.models.account import Account

class AccountFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'mealoor.Account'
        django_get_or_create = ('email',)

    email = 'test_account@test.com'
    username = 'test account'
