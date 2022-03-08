from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from mealoor.models import Account
from mealoor.models import Body

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

admin.site.register(Account, AccountAdmin)
admin.site.register(Body, BodyAdmin)
