import datetime
import math
from decimal import Decimal
from decimal import ROUND_HALF_UP
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from rest_framework.authtoken.models import Token

from mealoor import views
from mealoor.models.account import Account
from mealoor.models.eat import Eat
from mealoor.models.eatCategory import EatCategory
from mealoor.models.favoriteEat import FavoriteEat
from mealoor.models.favoriteEatCategory import FavoriteEatCategory
from mealoor.tests.factories.account import AccountFactory
from mealoor.tests.factories.favoriteEat import FavoriteEatFactory
from mealoor.tests.factories.favoriteEatCategory import FavoriteEatCategoryFactory

class FavoriteEatTests(APITestCase):
    """
    FavoriteEat APIのテスト
    """
    def test_get_favorite_eat_api(self):
        """
        お気に入り食事データを取得
        """
        test_account1 = AccountFactory(email='test_list1@test.com')
        test_account1_token = Token.objects.get(user=test_account1)

        test_account2 = AccountFactory(email='test_list2@test.com')

        create_favorite_eat_num = 11
        today_str = datetime.date.today().strftime('%Y-%m-%d')
        favorite_eats = FavoriteEatFactory.create_batch(create_favorite_eat_num, account=test_account1)
        test_account2_data = FavoriteEatFactory(account=test_account2)

        self.assertEqual(
            FavoriteEat.objects.count(),
            create_favorite_eat_num + 1,
            'データ件数の事前チェック',
        )

        factory = APIRequestFactory()
        eat_list_view = views.ListFavoriteEatView.as_view()

        request = factory.get(f'/api/favoriteEat/')
        force_authenticate(request, test_account1, test_account1_token)

        response = eat_list_view(request)
        response_data = response.data
        response_data_results = response_data['results']
        response_data_id = set(map(lambda data: data['id'], response_data_results))

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        self.assertEqual(
            len(response_data_results),
            10,
            '取得データ件数が10件になることを確認'
        )

        self.assertEqual(
            response_data['count'],
            create_favorite_eat_num,
            'レスポンスのキーcountの値が取得対象データ件数になることを確認'
        )

        self.assertEqual(
            response_data['total_pages'],
            math.ceil(create_favorite_eat_num / 10.0),
            'レスポンスのキーtotal_pagesの値が抽出対象のページ数になることを確認'
        )

        self.assertEqual(
            response_data['page_size'],
            10,
            'レスポンスのキーpage_sizeの値が1ページあたりの件数になることを確認'
        )

        self.assertFalse(
            test_account2_data.id in response_data_id,
            '別アカウントのデータは取得されないことを確認'
        )

    def test_create_favorite_eat_api(self):
        """
        お気に入り食事情報登録テスト
        """
        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            'お気に入り食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            0,
            'お気に入り食事カテゴリーデータ事前データチェック',
        )
        test_account = AccountFactory()
        test_token = Token.objects.get(user=test_account)
        create_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                { 'id': -1, 'category': '米' },
            ],
            'registered_name': 'テスト登録名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_create_view = views.CreateFavoriteEatView.as_view()
        request = factory.post('favoriteEat/create/', data=create_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること',
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            '食事データが登録されていることを確認'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            '食事カテゴリーデータが登録されていることを確認'
        )

        # モデルのチェック
        created_favorite_eat = FavoriteEat.objects.first()
        self.assertEqual(
            test_account,
            created_favorite_eat.account,
            '認証アカウントのデータとして作成されていることを確認',
        )

        self.assertEqual(
            create_json['name'],
            created_favorite_eat.name,
            'JSONの名前で登録されていることを確認',
        )

        self.assertEqual(
            create_json['eat_type'],
            created_favorite_eat.eat_type,
            'JSONの食事タイプで登録されていることを確認',
        )

        self.assertEqual(
            create_json['food_type'],
            created_favorite_eat.food_type,
            'JSONの食料タイプで登録されていることを確認',
        )

        self.assertEqual(
            create_json['registered_name'],
            created_favorite_eat.registered_name,
            'JSONの登録名で登録されていることを確認',
        )

        self.assertEqual(
            create_json['amount_note'],
            created_favorite_eat.amount_note,
            'JSONの分量メモで登録されていることを確認',
        )

        self.assertEqual(
            create_json['shop'],
            created_favorite_eat.shop,
            'JSONの店で登録されていることを確認',
        )

        self.assertEqual(
            create_json['price'],
            created_favorite_eat.price,
            'JSONの価格で登録されていることを確認',
        )

        self.assertEqual(
            create_json['kcal'],
            created_favorite_eat.kcal,
            'JSONのカロリーで登録されていることを確認',
        )

        self.assertEqual(
            create_json['amount'],
            created_favorite_eat.amount,
            'JSONの量で登録されていることを確認',
        )

        self.assertEqual(
            create_json['unit'],
            created_favorite_eat.unit,
            'JSONの単位で登録されていることを確認',
        )

        self.assertEqual(
            create_json['protein'],
            float(created_favorite_eat.protein),
            'JSONのタンパク質で登録されていることを確認',
        )

        self.assertEqual(
            create_json['lipid'],
            float(created_favorite_eat.lipid),
            'JSONの脂質で登録されていることを確認',
        )

        self.assertEqual(
            create_json['carbo'],
            float(created_favorite_eat.carbo),
            'JSONの炭水化物で登録されていることを確認',
        )

        self.assertEqual(
            create_json['note'],
            created_favorite_eat.note,
            'JSONのメモで登録されていることを確認',
        )

        self.assertIsNotNone(
            created_favorite_eat.created_at,
            '登録日がセットされていることを確認',
        )

        self.assertIsNotNone(
            created_favorite_eat.updated_at,
            '更新日がセットされていることを確認',
        )

        # EatCategoryのチェック
        created_favorite_eat_category = FavoriteEatCategory.objects.first()
        self.assertEqual(
            create_json['categories'][0]['category'],
            created_favorite_eat_category.category,
            'JSONの食事カテゴリーで登録されていることを確認',
        )

        self.assertEqual(
            create_json['amount'],
            created_favorite_eat_category.amount,
            'カテゴリーの量は食事の量で登録されていることを確認',
        )

        self.assertEqual(
            create_json['unit'],
            created_favorite_eat_category.unit,
            'カテゴリーの単位は食事の単位で登録されていることを確認',
        )

        self.assertIsNotNone(
            created_favorite_eat_category.created_at,
            '登録日がセットされていることを確認',
        )

        self.assertIsNotNone(
            created_favorite_eat_category.updated_at,
            '更新日がセットされていることを確認',
        )

        # モデルのチェック
        self.assertEqual(
            create_json['name'],
            response_data['name'],
            'レスポンスの名前が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['eat_type'],
            response_data['eat_type'],
            'レスポンスの食事タイプが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['food_type'],
            response_data['food_type'],
            'レスポンスの食料タイプが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['registered_name'],
            response_data['registered_name'],
            'レスポンスの登録名が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['amount_note'],
            response_data['amount_note'],
            'レスポンスの分量メモが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['shop'],
            response_data['shop'],
            'レスポンスの店が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['price'],
            response_data['price'],
            'レスポンスの価格が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['kcal'],
            response_data['kcal'],
            'レスポンスのカロリーが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['amount'],
            response_data['amount'],
            'レスポンスの量が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['unit'],
            response_data['unit'],
            'レスポンスの単位が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['protein'],
            float(response_data['protein']),
            'レスポンスのタンパク質が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['lipid'],
            float(response_data['lipid']),
            'レスポンスの脂質が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['carbo'],
            float(response_data['carbo']),
            'レスポンスの炭水化物が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['note'],
            response_data['note'],
            'レスポンスのメモが登録されたものであることを確認',
        )

        # EatCategoryの確認
        self.assertEqual(
            create_json['categories'][0]['category'],
            response_data['categories'][0]['category'],
            'レスポンスの食事カテゴリーが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['amount'],
            response_data['categories'][0]['amount'],
            'レスポンスの食事カテゴリーの量が食事の量であることを確認',
        )

        self.assertEqual(
            create_json['unit'],
            response_data['categories'][0]['unit'],
            'レスポンスの食事カテゴリーの単位が食事の単位であることを確認',
        )

    def test_create_favorite_eat_api_malti_categories(self):
        """
        お気に入り食事情報登録テスト複数カテゴリー
        """
        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            'お気に入り食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            0,
            'お気に入り食事カテゴリー事前データチェック',
        )
        test_account = AccountFactory()
        test_token = Token.objects.get(user=test_account)
        create_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                { 'id': -1, 'category': '米', 'amount': 100, 'unit': 'g' },
                { 'id': -2, 'category': '肉', 'amount': 50, 'unit': 'ml' },
                { 'id': -3, 'category': '卵', 'amount': 32, 'unit': 'g' },
            ],
            'registered_name': 'テスト登録名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_create_view = views.CreateFavoriteEatView.as_view()
        request = factory.post('/favoriteEat/create/', data=create_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること',
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            '食事データが登録されていることを確認'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            3,
            '食事カテゴリーデータが登録されていることを確認'
        )

        # モデルのチェック
        created_favorite_eat = FavoriteEat.objects.first()
        # EatCategoryのチェック
        for json_eat_category in create_json['categories']:
            created_favorite_eat_category = FavoriteEatCategory.objects.filter(
                favorite_eat=created_favorite_eat,
                category=json_eat_category['category'],
            ).values()
            self.assertEqual(
                created_favorite_eat_category.count(),
                1,
                '1カテゴリーが登録されていることを確認',
            )

            self.assertEqual(
                json_eat_category['category'],
                created_favorite_eat_category[0]['category'],
                'JSONの食事カテゴリーで登録されていることを確認',
            )

            self.assertEqual(
                json_eat_category['amount'],
                created_favorite_eat_category[0]['amount'],
                'カテゴリーの量は食事の量で登録されていることを確認',
            )

            self.assertEqual(
                json_eat_category['unit'],
                created_favorite_eat_category[0]['unit'],
                'カテゴリーの単位は食事の単位で登録されていることを確認',
            )

            self.assertIsNotNone(
                created_favorite_eat_category[0]['created_at'],
                '登録日がセットされていることを確認',
            )

            self.assertIsNotNone(
                created_favorite_eat_category[0]['updated_at'],
                '更新日がセットされていることを確認',
            )

        # モデルのチェック
        # EatCategoryの確認
        self.assertEqual(
            create_json['categories'][0]['category'],
            response_data['categories'][0]['category'],
            'レスポンスの食事カテゴリーが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['categories'][0]['amount'],
            response_data['categories'][0]['amount'],
            'レスポンスの食事カテゴリーの量が食事の量であることを確認',
        )

        self.assertEqual(
            create_json['categories'][0]['unit'],
            response_data['categories'][0]['unit'],
            'レスポンスの食事カテゴリーの単位が食事の単位であることを確認',
        )

    def test_create_favorite_eat_api_no_auth(self):
        """
        お気に入り食事情報登録テスト（認証情報なし）
        """
        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            '事前データチェック',
        )
        create_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                { 'id': -1, 'category': '米' },
            ],
            'registered_name': 'テスト登録名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_create_view = views.CreateFavoriteEatView.as_view()
        request = factory.post('favoriteEat/create/', data=create_json, format='json')
        response = favorite_eat_create_view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            'データが登録されていないことを確認',
        )

    def test_update_favorite_eat_api(self):
        """
        お気に入り食事情報更新テスト（カテゴリー編集）
        """
        target_eat = FavoriteEatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        target_eat_category = FavoriteEatCategoryFactory(favorite_eat=target_eat)
        target_eat_category_created_at = target_eat_category.created_at
        target_eat_category_updated_at = target_eat_category.updated_at

        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            'お気に入り食事カテゴリー事前データチェック',
        )

        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                { 'id': target_eat_category.id, 'category': 'お菓子' },
            ],
            'registered_name': 'テスト登録名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_update_view = views.UpdateFavoriteEatView.as_view()
        request = factory.patch(f'/api/favoriteEat/update/{target_eat.id}', data=update_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            '食事データが増えていないことを確認',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            '食事カテゴリーが増えていないことを確認',
        )

        # モデルのチェック
        updated_favorite_eat = FavoriteEat.objects.first()

        self.assertEqual(
            update_json['name'],
            updated_favorite_eat.name,
            'JSONの名前で更新されていることを確認',
        )

        self.assertEqual(
            update_json['eat_type'],
            updated_favorite_eat.eat_type,
            'JSONの食事タイプで更新されていることを確認',
        )

        self.assertEqual(
            update_json['food_type'],
            updated_favorite_eat.food_type,
            'JSONの食料タイプで更新されていることを確認',
        )

        self.assertEqual(
            update_json['registered_name'],
            updated_favorite_eat.registered_name,
            'JSONの登録名で更新されていることを確認',
        )

        self.assertEqual(
            update_json['amount_note'],
            updated_favorite_eat.amount_note,
            'JSONの分量メモで更新されていることを確認',
        )

        self.assertEqual(
            update_json['shop'],
            updated_favorite_eat.shop,
            'JSONの店で更新されていることを確認',
        )

        self.assertEqual(
            update_json['price'],
            updated_favorite_eat.price,
            'JSONの価格で更新されていることを確認',
        )

        self.assertEqual(
            update_json['kcal'],
            updated_favorite_eat.kcal,
            'JSONのカロリーで更新されていることを確認',
        )

        self.assertEqual(
            update_json['amount'],
            updated_favorite_eat.amount,
            'JSONの量で更新されていることを確認',
        )

        self.assertEqual(
            update_json['unit'],
            updated_favorite_eat.unit,
            'JSONの単位で更新されていることを確認',
        )

        self.assertEqual(
            update_json['protein'],
            float(updated_favorite_eat.protein),
            'JSONのタンパク質で更新されていることを確認',
        )

        self.assertEqual(
            update_json['lipid'],
            float(updated_favorite_eat.lipid),
            'JSONの脂質で更新されていることを確認',
        )

        self.assertEqual(
            update_json['carbo'],
            float(updated_favorite_eat.carbo),
            'JSONの炭水化物で更新されていることを確認',
        )

        self.assertEqual(
            update_json['note'],
            updated_favorite_eat.note,
            'JSONのメモで更新されていることを確認',
        )

        self.assertEqual(
            updated_favorite_eat.created_at,
            target_eat_created_at,
            '登録日が更新されていないことを確認',
        )

        self.assertNotEqual(
            updated_favorite_eat.updated_at,
            target_eat_updated_at,
            '更新日が更新されていることを確認',
        )

        # EatCategoryのチェック
        updated_eat_category = FavoriteEatCategory.objects.first()
        self.assertEqual(
            update_json['categories'][0]['category'],
            updated_eat_category.category,
            'JSONの食事カテゴリーで更新されていることを確認',
        )

        self.assertEqual(
            update_json['amount'],
            updated_eat_category.amount,
            'カテゴリーの量は食事の量で更新されていることを確認',
        )

        self.assertEqual(
            update_json['unit'],
            updated_eat_category.unit,
            'カテゴリーの単位は食事の単位で更新されていることを確認',
        )

        self.assertEqual(
            updated_eat_category.created_at,
            target_eat_category_created_at,
            '食事カテゴリーの登録日が更新されていないことを確認',
        )

        self.assertNotEqual(
            updated_eat_category.updated_at,
            target_eat_category_updated_at,
            '食事カテゴリーの更新日が更新されていることを確認',
        )

        # モデルのチェック
        self.assertEqual(
            update_json['name'],
            response_data['name'],
            'レスポンスの名前が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['eat_type'],
            response_data['eat_type'],
            'レスポンスの食事タイプが更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['food_type'],
            response_data['food_type'],
            'レスポンスの食料タイプが更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['registered_name'],
            response_data['registered_name'],
            'レスポンスの登録名が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['amount_note'],
            response_data['amount_note'],
            'レスポンスの分量メモが更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['shop'],
            response_data['shop'],
            'レスポンスの店が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['price'],
            response_data['price'],
            'レスポンスの価格が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['kcal'],
            response_data['kcal'],
            'レスポンスのカロリーが更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['amount'],
            response_data['amount'],
            'レスポンスの量が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['unit'],
            response_data['unit'],
            'レスポンスの単位が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['protein'],
            float(response_data['protein']),
            'レスポンスのタンパク質が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['lipid'],
            float(response_data['lipid']),
            'レスポンスの脂質が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['carbo'],
            float(response_data['carbo']),
            'レスポンスの炭水化物が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['note'],
            response_data['note'],
            'レスポンスのメモが更新されたものであることを確認',
        )

        # EatCategoryの確認
        self.assertEqual(
            update_json['categories'][0]['category'],
            response_data['categories'][0]['category'],
            'レスポンスの食事カテゴリーが登録されたものであることを確認',
        )

        self.assertEqual(
            update_json['amount'],
            response_data['categories'][0]['amount'],
            'レスポンスの食事カテゴリーの量が食事の量であることを確認',
        )

        self.assertEqual(
            update_json['unit'],
            response_data['categories'][0]['unit'],
            'レスポンスの食事カテゴリーの単位が食事の単位であることを確認',
        )

    def test_update_favorite_eat_api_add_category(self):
        """
        お気に入り食事情報更新テスト（カテゴリー追加）
        """
        target_eat = FavoriteEatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        target_eat_category = FavoriteEatCategory(
            favorite_eat=target_eat,
            category="肉",
            amount=100,
            unit="g",
        )
        target_eat_category.save()
        target_eat_category_created_at = target_eat_category.created_at
        target_eat_category_updated_at = target_eat_category.updated_at

        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            'お気に入り食事カテゴリー事前データチェック',
        )

        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                {
                    'id': target_eat_category.id,
                    'category': target_eat_category.category,
                    'amount': target_eat_category.amount,
                    'unit': target_eat_category.unit
                },
                { 'id': -1, 'category': '単色野菜', 'amount': 10, 'unit': 'kg' }
            ],
            'registered_name': 'テスト登録名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_update_view = views.UpdateFavoriteEatView.as_view()
        request = factory.patch(f'/api/favoriteEat/update/{target_eat.id}', data=update_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            2,
            '食事カテゴリーが追加されていることを確認',
        )

        # EatCategoryのチェック
        for json_favorite_eat_category in update_json['categories']:
            update_favorite_eat_category = FavoriteEatCategory.objects.filter(
                favorite_eat=target_eat,
                category=json_favorite_eat_category['category'],
            ).values()
            self.assertEqual(
                update_favorite_eat_category.count(),
                1,
                '1カテゴリーが登録されていることを確認',
            )

            self.assertEqual(
                json_favorite_eat_category['category'],
                update_favorite_eat_category[0]['category'],
                'JSONの食事カテゴリーで更新されていることを確認',
            )

            self.assertEqual(
                json_favorite_eat_category['amount'],
                update_favorite_eat_category[0]['amount'],
                'カテゴリーの量はJSONの食事カテゴリーの量で更新されていることを確認',
            )

            self.assertEqual(
                json_favorite_eat_category['unit'],
                update_favorite_eat_category[0]['unit'],
                'カテゴリーの単位はJSONの食事カテゴリーの単位で更新されていることを確認',
            )

        # モデルのチェック
        # EatCategoryの確認
        for response_favorite_eat_category in response_data['categories']:
            update_favorite_eat_category = FavoriteEatCategory.objects.filter(
                favorite_eat=target_eat,
                category=response_favorite_eat_category['category'],
            ).values()
            self.assertEqual(
                update_favorite_eat_category.count(),
                1,
                '1カテゴリーが登録されていることを確認',
            )

            self.assertEqual(
                response_favorite_eat_category['category'],
                update_favorite_eat_category[0]['category'],
                'JSONの食事カテゴリーで更新されていることを確認',
            )

            self.assertEqual(
                response_favorite_eat_category['amount'],
                update_favorite_eat_category[0]['amount'],
                'カテゴリーの量はJSONの食事カテゴリーの量で更新されていることを確認',
            )

            self.assertEqual(
                response_favorite_eat_category['unit'],
                update_favorite_eat_category[0]['unit'],
                'カテゴリーの単位はJSONの食事カテゴリーの単位で更新されていることを確認',
            )

    def test_update_favorite_eat_api_delete_category(self):
        """
        お気に入り食事情報更新テスト（カテゴリー削除）
        """
        target_eat = FavoriteEatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        exist_eat_category = FavoriteEatCategoryFactory(favorite_eat=target_eat)
        delete_eat_category = FavoriteEatCategoryFactory(favorite_eat=target_eat)

        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            '食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            2,
            '食事カテゴリー事前データチェック',
        )

        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                {
                    'id': exist_eat_category.id,
                    'category': exist_eat_category.category,
                    'amount': exist_eat_category.amount,
                    'unit': exist_eat_category.unit
                },
            ],
            'registered_name': '登録テスト名',
            'amount_note': '分量メモ',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_update_view = views.UpdateFavoriteEatView.as_view()
        request = factory.patch(f'/api/favoriteEat/update/{target_eat.id}', data=update_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            '食事カテゴリーが削除されていることを確認',
        )

        # EatCategoryのチェック
        # モデルのチェック
        self.assertTrue(
            FavoriteEatCategory.objects.filter(id=exist_eat_category.id).exists(),
            'JSONに存在するカテゴリーは削除されていない',
        )

        self.assertFalse(
            FavoriteEatCategory.objects.filter(id=delete_eat_category.id).exists(),
            'JSONに存在するカテゴリーは削除されている',
        )

        # レスポンスのチェック
        # EatCategoryの確認
        self.assertEqual(
            len(response_data['categories']),
            1,
            'レスポンスのカテゴリーも1件削除されていることを確認',
        )

        self.assertEqual(
            response_data['categories'][0]['id'],
            exist_eat_category.id,
            'レスポンスのカテゴリーは削除されたカテゴリーではないことを確認',
        )

    def test_update_favorite_eat_api_no_auth(self):
        """
        お気に入り食事情報更新テスト（認証情報なし）
        """
        target_eat = FavoriteEatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'categories': [
                { 'id': -1, 'category': 'お菓子', 'amount': None, 'unit': None },
            ],
            'registered_name': '登録テスト名',
            'amount_note': '分量メモ',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'note': 'テスト\nメモ',
        }

        factory = APIRequestFactory()
        favorite_eat_update_view = views.UpdateFavoriteEatView.as_view()
        request = factory.patch(f'/api/favoriteEat/update/{target_eat.id}', data=update_json)
        response = favorite_eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること',
        )

    def test_delete_favorite_eat_api(self):
        """
        食事情報削除テスト
        """
        target_eat = FavoriteEatFactory()
        target_eat_factories = FavoriteEatCategoryFactory.create_batch(3, favorite_eat=target_eat)
        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データ事前チェック'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            3,
            'お気に入り食事カテゴリー事前チェック'
        )

        factory = APIRequestFactory()
        favorite_eat_delete_view = views.DeleteFavoriteEatView.as_view()
        request = factory.delete(f'/api/favoriteEat/delete/{target_eat.id}')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_delete_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            'HTTPステータス204であること',
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            'お気に入り食事データが削除されていることを確認'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            0,
            'お気に入り食事カテゴリーデータが削除されていることを確認'
        )

    def test_delete_favorite_eat_api_no_auth(self):
        """
        お気に入り食事情報削除テスト（認証情報なし）
        """
        target_eat = FavoriteEatFactory()
        target_eat_category = FavoriteEatCategoryFactory(favorite_eat=target_eat)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データ事前チェック'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            'お気に入り食事カテゴリーデータ事前チェック'
        )

        factory = APIRequestFactory()
        favorite_eat_delete_view = views.DeleteEatView.as_view()
        request = factory.delete(f'/api/favoriteEat/delete/{target_eat.id}')
        response = favorite_eat_delete_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること',
        )

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データが削除されていないことを確認'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            'お気に入り食事カテゴリーデータが削除されていないことを確認'
        )

    def test_eat_favorite_eat_api(self):
        """
        お気に入り食事から食事データの登録
        """
        self.assertEqual(
            FavoriteEat.objects.count(),
            0,
            'お気に入り食事データ事前データチェック',
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            0,
            'お気に入り食事カテゴリーデータ事前データチェック',
        )

        self.assertEqual(
            Eat.objects.count(),
            0,
            '食事データ事前データチェック',
        )

        self.assertEqual(
            EatCategory.objects.count(),
            0,
            '食事カテゴリーデータ事前データチェック',
        )
        test_account = AccountFactory()
        test_token = Token.objects.get(user=test_account)

        favorite_eat = FavoriteEatFactory(
            account=test_account,
            name='シーフードカレー',
            eat_type='外食',
            food_type='料理',
            registered_name='カレー',
            shop='',
            price=160,
            kcal=340,
            amount=90,
            unit='g',
            protein=10.5,
            lipid=25.5,
            carbo=37.0,
            note='FavoriteEatメモ',
        )

        favorite_eat_category1 = FavoriteEatCategoryFactory(
            favorite_eat=favorite_eat,
            category='米',
            amount=50,
            unit='g',
        )

        favorite_eat_category2 = FavoriteEatCategoryFactory(
            favorite_eat=favorite_eat,
            category='魚介',
            amount=10,
            unit='g',
        )

        favorite_eat_category3 = FavoriteEatCategoryFactory(
            favorite_eat=favorite_eat,
            category='緑黄色野菜',
            amount=10,
            unit='g',
        )

        eat_json = {
            'date': datetime.date.today(),
            'eat_timing': '昼食',
            'rate': 50,
            'name': 'カレーライス',
            'price': 600,
            'discounted': True,
            'note': '食事メモ',
        }

        factory = APIRequestFactory()
        favorite_eat_eat_view = views.CreateEatFromFavoriteEatView.as_view()
        request = factory.post(f'favoriteEat/eat/{favorite_eat.id}', data=eat_json, format='json')
        force_authenticate(request, test_account, test_token)
        response = favorite_eat_eat_view(request, favorite_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること',
        )

        self.assertIsNone(
            response_data,
            'レスポンスに作成Eatデータが含まれていないことを確認',
        )

        self.assertEqual(
            Eat.objects.count(),
            1,
            '食事データが登録されていることを確認'
        )

        self.assertEqual(
            EatCategory.objects.count(),
            FavoriteEatCategory.objects.count(),
            '食事カテゴリーデータがお気に入り食事カテゴリーと同じ件数分登録されていることを確認'
        )

        calced_rate = Decimal(str(eat_json['rate'] / 100))

        # 作成された食事データの確認
        created_eat = Eat.objects.first()

        self.assertEqual(
            created_eat.account,
            favorite_eat.account,
            '作成された食事データがFavoriteEatと同じアカウントであることを確認',
        )

        self.assertEqual(
            created_eat.name,
            eat_json['name'],
            '作成された食事データの名前はリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.eat_type,
            favorite_eat.eat_type,
            '作成された食事データの食事タイプはFavoriteEatと同じであることを確認',
        )

        self.assertEqual(
            created_eat.food_type,
            favorite_eat.food_type,
            '作成された食事データの食料タイプはFavoriteEatと同じであることを確認',
        )

        self.assertEqual(
            created_eat.date,
            eat_json['date'],
            '作成された食事データの日付はリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.eat_timing,
            eat_json['eat_timing'],
            '作成された食事データの食事タイミングはリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.shop,
            favorite_eat.shop,
            '作成された食事データの店はFavoriteEatと同じであることを確認',
        )

        self.assertEqual(
            created_eat.price,
            eat_json['price'],
            '作成された食事データの価格はリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.kcal,
            favorite_eat.kcal * calced_rate,
            '作成された食事データのカロリーはFavoriteEatの設定値とリクエストの割合で計算したものであることを確認',
        )

        self.assertEqual(
            created_eat.amount,
            favorite_eat.amount * calced_rate,
            '作成された食事データの量はFavoriteEatの設定値とリクエストの割合で計算したものであることを確認',
        )

        self.assertEqual(
            created_eat.unit,
            favorite_eat.unit,
            '作成された食事データの単位はFavoriteEatと同じであることを確認',
        )

        self.assertEqual(
            created_eat.protein,
            (Decimal(favorite_eat.protein) * calced_rate).quantize(Decimal('0.1'), rounding=ROUND_HALF_UP),
            '作成された食事データのタンパク質はリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.lipid,
            (Decimal(favorite_eat.lipid) * calced_rate).quantize(Decimal('0.1'), rounding=ROUND_HALF_UP),
            '作成された食事データの脂質はFavoriteEatの設定値とリクエストの割合で計算したものであることを確認',
        )

        self.assertEqual(
            created_eat.carbo,
            (Decimal(favorite_eat.carbo) * calced_rate).quantize(Decimal('0.1'), rounding=ROUND_HALF_UP),
            '作成された食事データの炭水化物はFavoriteEatの設定値とリクエストの割合で計算したものであることを確認',
        )

        self.assertEqual(
            created_eat.discounted,
            eat_json['discounted'],
            '作成された食事データの割引フラグはリクエストのものであることを確認',
        )

        self.assertEqual(
            created_eat.note,
            eat_json['note'],
            '作成された食事データのメモはリクエストのものであることを確認',
        )

        # 作成された食事カテゴリーデータの確認
        eat_category1 = EatCategory.objects.filter(
            category=favorite_eat_category1.category
        )

        self.assertEqual(
            len(eat_category1),
            1,
            '食事カテゴリーが1件であることを確認',
        )

        self.assertEqual(
            eat_category1[0].eat,
            created_eat,
            '作成された食事カテゴリーの食事が処理で作成されたものであるを確認',
        )

        self.assertEqual(
            eat_category1[0].category,
            favorite_eat_category1.category,
            '作成された食事カテゴリーが一致していることを確認',
        )

        self.assertEqual(
            eat_category1[0].amount,
            (Decimal(favorite_eat_category1.amount) * calced_rate).quantize(Decimal('1'), rounding=ROUND_HALF_UP),
            '作成された食事カテゴリーの量が計算されたものであることを確認',
        )

        self.assertEqual(
            eat_category1[0].unit,
            favorite_eat_category1.unit,
            '作成された食事カテゴリーの単位が一致していることを確認',
        )

        eat_category2 = EatCategory.objects.filter(
            category=favorite_eat_category2.category
        )

        self.assertEqual(
            len(eat_category2),
            1,
            '食事カテゴリーが1件であることを確認',
        )

        self.assertEqual(
            eat_category2[0].eat,
            created_eat,
            '作成された食事カテゴリーの食事が処理で作成されたものであるを確認',
        )

        self.assertEqual(
            eat_category2[0].category,
            favorite_eat_category2.category,
            '作成された食事カテゴリーが一致していることを確認',
        )

        self.assertEqual(
            eat_category2[0].amount,
            (Decimal(favorite_eat_category2.amount) * calced_rate).quantize(Decimal('1'), rounding=ROUND_HALF_UP),
            '作成された食事カテゴリーの量が計算されたものであることを確認',
        )

        self.assertEqual(
            eat_category2[0].unit,
            favorite_eat_category2.unit,
            '作成された食事カテゴリーの単位が一致していることを確認',
        )

        eat_category3 = EatCategory.objects.filter(
            category=favorite_eat_category3.category
        )

        self.assertEqual(
            len(eat_category3),
            1,
            '食事カテゴリーが1件であることを確認',
        )

        self.assertEqual(
            eat_category3[0].eat,
            created_eat,
            '作成された食事カテゴリーの食事が処理で作成されたものであるを確認',
        )

        self.assertEqual(
            eat_category3[0].category,
            favorite_eat_category3.category,
            '作成された食事カテゴリーが一致していることを確認',
        )

        self.assertEqual(
            eat_category3[0].amount,
            (Decimal(favorite_eat_category3.amount) * calced_rate).quantize(Decimal('1'), rounding=ROUND_HALF_UP),
            '作成された食事カテゴリーの量が計算されたものであることを確認',
        )

        self.assertEqual(
            eat_category3[0].unit,
            favorite_eat_category3.unit,
            '作成された食事カテゴリーの単位が一致していることを確認',
        )

    def test_eat_favorite_eat_api_no_auth(self):
        """
        お気に入り食事から食事データの登録（認証情報なし）
        """
        favorite_eat = FavoriteEatFactory()
        favorite_eat_category = FavoriteEatCategoryFactory(favorite_eat=favorite_eat)

        self.assertEqual(
            FavoriteEat.objects.count(),
            1,
            'お気に入り食事データ事前チェック'
        )

        self.assertEqual(
            FavoriteEatCategory.objects.count(),
            1,
            'お気に入り食事カテゴリーデータ事前チェック'
        )

        self.assertEqual(
            Eat.objects.count(),
            0,
            '食事データ事前データチェック',
        )

        self.assertEqual(
            EatCategory.objects.count(),
            0,
            '食事カテゴリーデータ事前データチェック',
        )

        eat_json = {
            'date': datetime.date.today(),
            'eat_timing': '昼食',
            'rate': 50,
            'name': 'カレーライス',
            'price': 600,
            'discounted': True,
            'note': '食事メモ',
        }

        factory = APIRequestFactory()
        favorite_eat_eat_view = views.CreateEatFromFavoriteEatView.as_view()
        request = factory.post(f'favoriteEat/eat/{favorite_eat.id}', data=eat_json, format='json')
        response = favorite_eat_eat_view(request, favorite_eat.id)

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること',
        )

        self.assertEqual(
            Eat.objects.count(),
            0,
            '食事データが登録されていないことを確認'
        )

        self.assertEqual(
            EatCategory.objects.count(),
            0,
            '食事カテゴリーデータが登録されていないことを確認'
        )
