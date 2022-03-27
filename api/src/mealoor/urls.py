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
    path('body/create/', views.CreateBodyView.as_view(), name='body_create'),
    path('body/<str:date>/', views.ShowBodyView.as_view(), name='body_show'),
    path('body/update/<str:date>/', views.UpdateBodyView.as_view(), name='body_update'),
    path('body/delete/<str:date>/', views.DeleteBodyView.as_view(), name='body_delete'),
    path('eat/create/', views.CreateEatView.as_view(), name='eat_create'),
    path('eat/<str:date>/', views.ListDateEatView.as_view(), name='eat_list'),
    path('eat/update/<int:id>/', views.UpdateEatView.as_view(), name='eat_update'),
    path('eat/delete/<int:id>/', views.DeleteEatView.as_view(), name='eat_delete'),
    path('favoriteEat/create/', views.CreateFavoriteEatView.as_view(), name='favorite_eat_create'),
    path('favoriteEat/update/<int:id>/', views.UpdateFavoriteEatView.as_view(), name='favorite_eat_update'),
    path('favoriteEat/delete/<int:id>/', views.DeleteFavoriteEatView.as_view(), name='favorite_eat_delete'),
]
