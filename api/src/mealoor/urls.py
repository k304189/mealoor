from django.urls import path
from mealoor import views

app_name = 'mealoor'

urlpatterns = [
    path('account/', views.ShowAccountView.as_view(), name='show'),
    path('account/create/', views.CreateAccountView.as_view(), name='create'),
    path('account/token/', views.CreateTokenView.as_view(), name='token'),
    path('account/signout/', views.DeleteTokenView.as_view(), name='signout'),
    path('account/update/', views.ManageAccountView.as_view(), name='update'),
    path('account/withdraw/', views.WithdrawAccountView.as_view(), name='withdraw'),
    path('body/<str:date>/', views.ShowBodyView.as_view(), name='body_show'),
    path('body/create/', views.CreateBodyView.as_view(), name='body_create'),
    path('body/update/<str:date>/', views.UpdateBodyView.as_view(), name='body_update'),
    path('body/delete/<str:date>/', views.UpdateBodyView.as_view(), name='body_delete'),
]
