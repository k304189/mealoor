from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator


class Stock(models.Model):
    account = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='stocks',
        verbose_name='アカウント',
    )
    name = models.CharField(
        verbose_name='名前',
        max_length=60,
    )
    eat_type = models.CharField(
        verbose_name='食事タイプ',
        max_length=10,
    )
    food_type = models.CharField(
        verbose_name='食料タイプ',
        max_length=10,
    )
    limit = models.DateField(
        verbose_name='食事日',
    )
    location = models.CharField(
        verbose_name='保管場所',
        max_length=10,
    )
    quantity = models.PositiveIntegerField(
        verbose_name='量',
        default=1,
        validators=[MinValueValidator(1)]
    )
    remain = models.PositiveIntegerField(
        verbose_name='残量',
        default=100,
        validators=[MinValueValidator(0),
                    MaxValueValidator(100)],
    )
    shop = models.CharField(
        verbose_name='店',
        max_length=60,
        null=True,
        blank=True,
    )
    price = models.PositiveIntegerField(
        verbose_name='価格',
        default=0,
    )
    kcal = models.PositiveIntegerField(
        verbose_name='カロリー',
        default=0,
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
    protein = models.DecimalField(
        verbose_name='タンパク質',
        max_digits=4,
        decimal_places=1,
        default=0.0,
        validators=[MinValueValidator(0.0),
                    MaxValueValidator(999.9)],
    )
    lipid = models.DecimalField(
        verbose_name='脂質',
        max_digits=4,
        decimal_places=1,
        default=0.0,
        validators=[MinValueValidator(0.0),
                    MaxValueValidator(999.9)],
    )
    carbo = models.DecimalField(
        verbose_name='炭水化物',
        max_digits=4,
        decimal_places=1,
        default=0.0,
        validators=[MinValueValidator(0.0),
                    MaxValueValidator(999.9)],
    )
    discounted = models.BooleanField(
        verbose_name='割引フラグ',
        default=False,
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
        verbose_name_plural = 'Stocks'

    def __str__(self):
        return self.account.username + ' ' + self.name + ' ' + str(self.limit)
