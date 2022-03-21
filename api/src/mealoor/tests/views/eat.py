import datetime
import factory as factory_bot
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from rest_framework.authtoken.models import Token

from mealoor import views
from mealoor.models.account import Account
from mealoor.models.eat import Eat
from mealoor.tests.factories.account import AccountFactory
from mealoor.tests.factories.eat import EatFactory

class EatTests(APITestCase):
    """
    Eat APIのテスト
    """

    def test_list_eat_api(self):
        test_account1 = AccountFactory(email="test_list1@test.com")
        test_account1_token = Token.objects.get(user=test_account1)

        test_account2 = AccountFactory(email="test_list2@test.com")

        create_eat_num = 10
        today_str = datetime.date.today().strftime('%Y-%m-%d')
        eats = EatFactory.create_batch(create_eat_num, account=test_account1)
        yeasterday_eat = EatFactory(
            account=test_account1,
            date=datetime.date.today() + datetime.timedelta(days=-1),
        )
        test_account2_data = EatFactory(account=test_account2)

        self.assertEqual(
            Eat.objects.count(),
            create_eat_num + 2,
            'データ件数の事前チェック',
        )

        factory = APIRequestFactory()
        eat_list_view = views.ListDateEatView.as_view()

        request = factory.get(f'/api/eat/{today_str}')
        force_authenticate(request, test_account1, test_account1_token)

        response = eat_list_view(request, date=today_str)
        response_data = response.data
        response_data_id = set(map(lambda data: data["id"], response_data))

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        self.assertEqual(
            len(response_data),
            create_eat_num,
            '取得データ件数が一致することを確認'
        )

        self.assertFalse(
            yeasterday_eat.id in response_data_id,
            '指定日以外のデータは取得されないことを確認'
        )

        self.assertFalse(
            test_account2_data.id in response_data_id,
            '別アカウントのデータは取得されないことを確認'
        )

    def test_create_eat_api(self):
        """
        食事情報登録テスト
        """
        self.assertEqual(
            Eat.objects.count(),
            0,
            '事前データチェック',
        )
        test_account = AccountFactory()
        test_token = Token.objects.get(user=test_account)
        create_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'date': datetime.date.today(),
            'eat_timing': '朝食',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'discounted': True,
            'note': "テスト\nメモ",
        }

        factory = APIRequestFactory()
        eat_create_view = views.CreateEatView.as_view()
        request = factory.post('/api/eat/', data=create_json)
        force_authenticate(request, test_account, test_token)
        response = eat_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること',
        )

        self.assertEqual(
            Eat.objects.count(),
            1,
            'データが登録されていることを確認'
        )

        # モデルのチェック
        created_eat = Eat.objects.first()
        self.assertEqual(
            test_account,
            created_eat.account,
            '認証アカウントのデータとして作成されていることを確認',
        )

        self.assertEqual(
            create_json['name'],
            created_eat.name,
            'JSONの名前で登録されていることを確認',
        )

        self.assertEqual(
            create_json['eat_type'],
            created_eat.eat_type,
            'JSONの食事タイプで登録されていることを確認',
        )

        self.assertEqual(
            create_json['food_type'],
            created_eat.food_type,
            'JSONの食料タイプで登録されていることを確認',
        )

        self.assertEqual(
            create_json['date'],
            created_eat.date,
            'JSONの食事日で登録されていることを確認',
        )

        self.assertEqual(
            create_json['eat_timing'],
            created_eat.eat_timing,
            'JSONの食事タイミングで登録されていることを確認',
        )

        self.assertEqual(
            create_json['shop'],
            created_eat.shop,
            'JSONの店で登録されていることを確認',
        )

        self.assertEqual(
            create_json['price'],
            created_eat.price,
            'JSONの価格で登録されていることを確認',
        )

        self.assertEqual(
            create_json['kcal'],
            created_eat.kcal,
            'JSONのカロリーで登録されていることを確認',
        )

        self.assertEqual(
            create_json['amount'],
            created_eat.amount,
            'JSONの量で登録されていることを確認',
        )

        self.assertEqual(
            create_json['unit'],
            created_eat.unit,
            'JSONの単位で登録されていることを確認',
        )

        self.assertEqual(
            create_json['protein'],
            float(created_eat.protein),
            'JSONのタンパク質で登録されていることを確認',
        )

        self.assertEqual(
            create_json['lipid'],
            float(created_eat.lipid),
            'JSONの脂質で登録されていることを確認',
        )

        self.assertEqual(
            create_json['carbo'],
            float(created_eat.carbo),
            'JSONの炭水化物で登録されていることを確認',
        )

        self.assertEqual(
            create_json['discounted'],
            created_eat.discounted,
            'JSONの割引フラグで登録されていることを確認',
        )

        self.assertEqual(
            create_json['note'],
            created_eat.note,
            'JSONのメモで登録されていることを確認',
        )

        self.assertIsNotNone(
            created_eat.created_at,
            '登録日がセットされていることを確認',
        )

        self.assertIsNotNone(
            created_eat.updated_at,
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
            create_json['date'].strftime('%Y-%m-%d'),
            response_data['date'],
            'レスポンスの食事日が登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['eat_timing'],
            response_data['eat_timing'],
            'レスポンスの食事タイミングが登録されたものであることを確認',
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
            create_json['discounted'],
            response_data['discounted'],
            'レスポンスの割引フラグが登録されたものであることを確認',
        )

        self.assertEqual(
            create_json['note'],
            response_data['note'],
            'レスポンスのメモが登録されたものであることを確認',
        )

    def test_create_eat_api_no_auth(self):
        """
        食事情報登録テスト（認証情報なし）
        """
        self.assertEqual(
            Eat.objects.count(),
            0,
            '事前データチェック',
        )
        create_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'date': datetime.date.today(),
            'eat_timing': '朝食',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'discounted': True,
            'note': "テスト\nメモ",
        }

        factory = APIRequestFactory()
        eat_create_view = views.CreateEatView.as_view()
        request = factory.post('/api/eat/', data=create_json)
        response = eat_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

        self.assertEqual(
            Eat.objects.count(),
            0,
            'データが登録されていないことを確認',
        )

    def test_update_eat_api(self):
        """
        食事情報更新テスト
        """
        target_eat = EatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)
        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'date': datetime.date.today() + datetime.timedelta(days=-1),
            'eat_timing': '朝食',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'discounted': True,
            'note': "テスト\nメモ",
        }

        factory = APIRequestFactory()
        eat_update_view = views.UpdateEatView.as_view()
        request = factory.patch(f'/api/eat/update/{target_eat.id}', data=update_json)
        force_authenticate(request, test_account, test_token)
        response = eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること',
        )

        # モデルのチェック
        updated_eat = Eat.objects.first()

        self.assertEqual(
            update_json['name'],
            updated_eat.name,
            'JSONの名前で更新されていることを確認',
        )

        self.assertEqual(
            update_json['eat_type'],
            updated_eat.eat_type,
            'JSONの食事タイプで更新されていることを確認',
        )

        self.assertEqual(
            update_json['food_type'],
            updated_eat.food_type,
            'JSONの食料タイプで更新されていることを確認',
        )

        self.assertEqual(
            update_json['date'],
            updated_eat.date,
            'JSONの食事日で更新されていることを確認',
        )

        self.assertEqual(
            update_json['eat_timing'],
            updated_eat.eat_timing,
            'JSONの食事タイミングで更新されていることを確認',
        )

        self.assertEqual(
            update_json['shop'],
            updated_eat.shop,
            'JSONの店で更新されていることを確認',
        )

        self.assertEqual(
            update_json['price'],
            updated_eat.price,
            'JSONの価格で更新されていることを確認',
        )

        self.assertEqual(
            update_json['kcal'],
            updated_eat.kcal,
            'JSONのカロリーで更新されていることを確認',
        )

        self.assertEqual(
            update_json['amount'],
            updated_eat.amount,
            'JSONの量で更新されていることを確認',
        )

        self.assertEqual(
            update_json['unit'],
            updated_eat.unit,
            'JSONの単位で更新されていることを確認',
        )

        self.assertEqual(
            update_json['protein'],
            float(updated_eat.protein),
            'JSONのタンパク質で更新されていることを確認',
        )

        self.assertEqual(
            update_json['lipid'],
            float(updated_eat.lipid),
            'JSONの脂質で更新されていることを確認',
        )

        self.assertEqual(
            update_json['carbo'],
            float(updated_eat.carbo),
            'JSONの炭水化物で更新されていることを確認',
        )

        self.assertEqual(
            update_json['discounted'],
            updated_eat.discounted,
            'JSONの割引フラグで更新されていることを確認',
        )

        self.assertEqual(
            update_json['note'],
            updated_eat.note,
            'JSONのメモで更新されていることを確認',
        )

        self.assertEqual(
            updated_eat.created_at,
            target_eat_created_at,
            '登録日が更新されていないことを確認',
        )

        self.assertNotEqual(
            updated_eat.updated_at,
            target_eat_updated_at,
            '更新日が更新されていることを確認',
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
            update_json['date'].strftime('%Y-%m-%d'),
            response_data['date'],
            'レスポンスの食事日が更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['eat_timing'],
            response_data['eat_timing'],
            'レスポンスの食事タイミングが更新されたものであることを確認',
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
            update_json['discounted'],
            response_data['discounted'],
            'レスポンスの割引フラグが更新されたものであることを確認',
        )

        self.assertEqual(
            update_json['note'],
            response_data['note'],
            'レスポンスのメモが更新されたものであることを確認',
        )

    def test_update_eat_api_no_auth(self):
        """
        食事情報更新テスト（認証情報なし）
        """
        target_eat = EatFactory()
        target_eat_created_at = target_eat.created_at
        target_eat_updated_at = target_eat.updated_at

        update_json = {
            'name': 'テストネーム',
            'eat_type': '自炊',
            'food_type': '料理',
            'date': datetime.date.today() + datetime.timedelta(days=-1),
            'eat_timing': '朝食',
            'shop': 'テスト店',
            'price': 100,
            'kcal': 200,
            'amount': 300,
            'unit': 'g',
            'protein': 400.9,
            'lipid': 500.8,
            'carbo': 600.7,
            'discounted': True,
            'note': "テスト\nメモ",
        }

        factory = APIRequestFactory()
        eat_update_view = views.UpdateEatView.as_view()
        request = factory.patch(f'/api/eat/update/{target_eat.id}', data=update_json)
        response = eat_update_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること',
        )

    def test_delete_eat_api(self):
        """
        食事情報削除テスト
        """
        target_eat = EatFactory()
        test_account = target_eat.account
        test_token = Token.objects.get(user=test_account)

        self.assertEqual(
            Eat.objects.count(),
            1,
            '事前チェック'
        )

        factory = APIRequestFactory()
        eat_delete_view = views.DeleteEatView.as_view()
        request = factory.delete(f'/api/eat/delete/{target_eat.id}')
        force_authenticate(request, test_account, test_token)
        response = eat_delete_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            'HTTPステータス204であること',
        )

        self.assertEqual(
            Eat.objects.count(),
            0,
            'データが削除されていることを確認'
        )

    def test_delete_eat_api_no_auth(self):
        """
        食事情報削除テスト（認証情報なし）
        """
        target_eat = EatFactory()

        self.assertEqual(
            Eat.objects.count(),
            1,
            '事前チェック'
        )

        factory = APIRequestFactory()
        eat_delete_view = views.DeleteEatView.as_view()
        request = factory.delete(f'/api/eat/delete/{target_eat.id}')
        response = eat_delete_view(request, id=target_eat.id)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること',
        )

        self.assertEqual(
            Eat.objects.count(),
            1,
            'データが削除されていないことを確認'
        )
