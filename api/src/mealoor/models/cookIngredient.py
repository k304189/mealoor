from django.db import models
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator

from .stock import Stock

class CookIngredient(models.Model):
    cook = models.ForeignKey(
        'Stock',
        on_delete=models.CASCADE,
        related_name='ingredients',
        verbose_name='料理'
    )
    stock = models.ForeignKey(
        'Stock',
        on_delete=models.SET_NULL,
        related_name='cooks',
        null=True,
        verbose_name='食材'
    )
    rate = models.PositiveIntegerField(
        verbose_name='使用量',
        default=100,
        validators=[MinValueValidator(1),
                    MaxValueValidator(100)],
    )
    created_at = models.DateTimeField(
        verbose_name='データ作成日',
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name='データ更新日',
        auto_now=True,
    )

    class Meta:
        app_label = 'mealoor'
        verbose_name_plural = 'CookIngredients'

    def __str__(self):
        return self.cook.name + ' ' + self.stock.name + ' ' + str(self.rate) + '%'
