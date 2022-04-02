from django.db import models

from .favoriteEat import FavoriteEat

class FavoriteEatCategory(models.Model):
    favorite_eat = models.ForeignKey(
        FavoriteEat,
        on_delete=models.CASCADE,
        related_name='categories',
        verbose_name='お気に入り食事'
    )
    category = models.CharField(
        verbose_name='カテゴリー',
        max_length=15,
    )
    amount = models.PositiveIntegerField(
        verbose_name='量',
        default=0,
    )
    unit = models.CharField(
        verbose_name='単位',
        max_length=10,
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
        verbose_name_plural = 'FavoriteEatCategories'

    def __str__(self):
        return self.category
