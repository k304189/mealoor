from django.apps import AppConfig


class MealoorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mealoor'

    def ready(self):
        from . import signals
