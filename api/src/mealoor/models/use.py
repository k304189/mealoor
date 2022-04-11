from django.db import models
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator

from .stock import Stock
from .eat import Eat

class Use(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='uses',
        verbose_name='使用食材',
    )
    use_type = models.CharField(
        verbose_name='使用区分',
        max_length=10,
    )
    date = models.DateField(
        verbose_name='使用日',
    )
    created_stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='created_stock',
        verbose_name='作成された食材',
        blank=True,
        null=True,
    )
    created_eat = models.ForeignKey(
        Eat,
        on_delete=models.CASCADE,
        related_name='created_eat',
        verbose_name='作成された食事',
        blank=True,
        null=True,
    )
    rate = models.PositiveIntegerField(
        verbose_name='使用率',
        default=1,
        validators=[MinValueValidator(1),
                    MaxValueValidator(100)],
    )
    note = models.TextField(
        verbose_name='メモ',
        max_length=100,
        null=True,
        blank=True,
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
        verbose_name_plural = 'Uses'

    def __str__(self):
        return self.stock.name+ ' '+ str(self.date) + ' ' + self.use_type + ' ' + str(self.rate)
