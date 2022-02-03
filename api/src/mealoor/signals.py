from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from .models import Account

@receiver(post_save, sender=Account)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    ユーザー新規作成時、自動的にトークンを発行する
    """
    if created:
        Token.objects.create(user=instance)
