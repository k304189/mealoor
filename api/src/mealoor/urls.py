from django.urls import path
from mealoor import views

app_name = 'mealoor'

urlpatterns = [
    path('account/create/', views.CreateAccountView.as_view(), name='create'),
    path('account/token/', views.CreateTokenView.as_view(), name='token'),
    path('account/signout/', views.DeleteTokenView.as_view(), name='signout'),
    path('account/update/', views.ManageAccountView.as_view(), name='update'),
]
