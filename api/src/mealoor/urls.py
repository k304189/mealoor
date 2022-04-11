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
    path('favoriteEat/', views.ListFavoriteEatView.as_view(), name='favorite_eat_list'),
    path('favoriteEat/update/<int:id>/', views.UpdateFavoriteEatView.as_view(), name='favorite_eat_update'),
    path('favoriteEat/delete/<int:id>/', views.DeleteFavoriteEatView.as_view(), name='favorite_eat_delete'),
    path('favoriteEat/eat/<int:id>/', views.CreateEatFromFavoriteEatView.as_view(), name='favorite_eat_eat'),
    path('stock/create/', views.CreateStockView.as_view(), name='stock_create'),
    path('stock/', views.ListStockView.as_view(), name='stock_list'),
    path('stock/update/<int:id>/', views.UpdateStockView.as_view(), name='stock_update'),
    path('stock/delete/<int:id>/', views.DeleteStockView.as_view(), name='stock_delete'),
    path('stock/use/<int:id>/', views.UseStockView.as_view(), name='stock_use'),
    path('favoriteStock/create/', views.CreateFavoriteStockView.as_view(), name='favorite_stock_create'),
    path('favoriteStock/', views.ListFavoriteStockView.as_view(), name='favorite_stock_list'),
    path('favoriteStock/update/<int:id>/', views.UpdateFavoriteStockView.as_view(), name='favorite_stock_update'),
    path('favoriteStock/delete/<int:id>/', views.DeleteFavoriteStockView.as_view(), name='favorite_stock_delete'),
    path('favoriteStock/stock/<int:id>/', views.CreateStockFromFavoriteStockView.as_view(), name='favorite_stock_stock'),
    path('cook/create/', views.CreateCookStockView.as_view(), name='cook_create'),
    path('cook/cancel/<int:cook_id>/', views.CancelCookStockView.as_view(), name='cook_cancel'),
    path('cookIngredient/<int:cook_id>/', views.ListCookIngredientView.as_view(), name='cook_ingredient_list'),
]
