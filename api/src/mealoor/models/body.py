from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class Body(models.Model):
    account = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    date = models.DateField(
        verbose_name='計測日',
    )
    weight = models.DecimalField(
        verbose_name='体重',
        max_digits=5,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0.00),
                    MaxValueValidator(999.99)]
    )
    fat_rate = models.DecimalField(
        verbose_name='体脂肪率',
        max_digits=4,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0.00),
                    MaxValueValidator(99.99)]
    )
    fat_weight = models.DecimalField(
        verbose_name='体脂肪量',
        max_digits=5,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0.00),
                    MaxValueValidator(999.99)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'mealoor'
        constraints = [
            models.UniqueConstraint(
                fields=['account', 'date'],
                name='account_date_unique'
            ),
        ]

    def __str__(self):
        return self.account.username + ' ' + str(self.date)

    def save(self, *args, **kwargs):
        self.fat_weight = self.weight * (self.fat_rate / 100)
        super().save(*args, **kwargs)
