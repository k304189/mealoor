from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from mealoor.models import Account
from mealoor.models import Body
from mealoor.models import Eat
from mealoor.models import EatCategory
from mealoor.models import FavoriteEat
from mealoor.models import FavoriteEatCategory
from mealoor.models import Stock
from mealoor.models import StockCategory

class AccountAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'username']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('username', 'first_name', 'last_name', 'profile')}),
        (
            _('Permissions'),
             {'fields': ('is_active', 'is_staff', 'is_superuser')}
        )
    )

class BodyAdmin(admin.ModelAdmin):
    list_display = ['account', 'date', 'weight', 'fat_rate']
    fields = ['account', 'date', 'weight', 'fat_rate', 'fat_weight']

class EatAdmin(admin.ModelAdmin):
    list_display = ['account', 'date', 'eat_timing', 'name', 'shop', 'price', 'kcal']
    fields = [
        'account',
        'date',
        'eat_timing',
        'name',
        'shop',
        'price',
        'kcal',
        'eat_type',
        'food_type',
        'amount',
        'unit',
        'protein',
        'lipid',
        'carbo',
        'discounted',
        'note',
    ]

class EatCategoryAdmin(admin.ModelAdmin):
    list_display = ['eat', 'category', 'amount', 'unit']
    fields = ['eat', 'category', 'amount', 'unit']

class FavoriteEatAdmin(admin.ModelAdmin):
    list_display = ['account', 'name', 'amount_note', 'shop', 'price', 'kcal']
    fields = [
        'account',
        'name',
        'amount_note',
        'registered_name',
        'shop',
        'price',
        'kcal',
        'eat_type',
        'food_type',
        'amount',
        'unit',
        'protein',
        'lipid',
        'carbo',
        'note',
    ]

class FavoriteEatCategoryAdmin(admin.ModelAdmin):
    list_display = ['favorite_eat', 'category', 'amount', 'unit']
    fields = ['favorite_eat', 'category', 'amount', 'unit']

class StockAdmin(admin.ModelAdmin):
    list_display = ['account', 'name', 'limit', 'location', 'remain', 'price', 'kcal']
    fields = [
        'account',
        'name',
        'limit',
        'remain',
        'location',
        'quantity',
        'shop',
        'price',
        'kcal',
        'eat_type',
        'food_type',
        'amount',
        'unit',
        'protein',
        'lipid',
        'carbo',
        'discounted',
        'note',
    ]

class StockCategoryAdmin(admin.ModelAdmin):
    list_display = ['stock', 'category', 'amount', 'unit']
    fields = ['stock', 'category', 'amount', 'unit']

admin.site.register(Account, AccountAdmin)
admin.site.register(Body, BodyAdmin)
admin.site.register(Eat, EatAdmin)
admin.site.register(EatCategory, EatCategoryAdmin)
admin.site.register(FavoriteEat, FavoriteEatAdmin)
admin.site.register(FavoriteEatCategory, FavoriteEatCategoryAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(StockCategory, StockCategoryAdmin)
