import datetime
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from rest_framework.authtoken.models import Token

from mealoor import views
from mealoor.models.account import Account
from mealoor.models.body import Body
from mealoor.tests.factories.account import AccountFactory
from mealoor.tests.factories.body import BodyFactory

class BodyTests(APITestCase):
    """
    Body APIのテスト
    """
    @classmethod
    def setUpTestData(cls):
        """
        テスト用データ準備
        """
        BodyFactory()

    def test_show_body_api(self):
        """
        体調情報取得テスト
        """
        test_body_data = Body.objects.all().first()
        test_account = test_body_data.account
        test_token = Token.objects.get(user=test_account)

        factory = APIRequestFactory()
        body_show_view = views.ShowBodyView.as_view()

        request = factory.get(
            f'/api/body/{test_body_data.date}',
        )
        force_authenticate(request, test_account, test_token)
        response = body_show_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること'
        )

        self.assertEqual(
            response_data['weight'],
            str(test_body_data.weight),
            '登録している体重を取得することができる'
        )

        self.assertEqual(
            response_data['fat_rate'],
            str(test_body_data.fat_rate),
            '登録している体脂肪率を取得することができる'
        )

        self.assertEqual(
            response_data['fat_weight'],
            str(test_body_data.fat_weight),
            '登録している体脂肪量を取得することができる'
        )

    def test_show_body_api_no_auth(self):
        """
        体調情報取得テスト（認証情報なし）
        """
        test_body_data = Body.objects.all().first()

        factory = APIRequestFactory()
        body_show_view = views.ShowBodyView.as_view()

        request = factory.get(
            f'/api/body/{test_body_data.date}',
        )
        response = body_show_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

    def test_show_body_another_account_body_data(self):
        """
        体調情報取得テスト（別ユーザーデータ参照）
        """
        test_body_data = Body.objects.all().first()
        another_user = AccountFactory(email="body_view_test@test.com")
        another_user_token = Token.objects.get(user=another_user)

        factory = APIRequestFactory()
        body_show_view = views.ShowBodyView.as_view()

        request = factory.get(
            f'/api/body/{test_body_data.date}',
        )
        force_authenticate(request, another_user, another_user_token)
        response = body_show_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            'HTTPステータス404であること'
        )

    def test_create_body_api(self):
        """
        体調情報登録テスト
        """
        test_body_data = Body.objects.all().first()
        test_account = test_body_data.account
        test_token = Token.objects.get(user=test_account)

        body_json = {
            'date': test_body_data.date + datetime.timedelta(days=-1),
            'weight': 40.0,
            'fat_rate': 10.0,
            'fat_weight': 20.0,
        }

        factory = APIRequestFactory()
        body_create_view = views.CreateBodyView.as_view()

        request = factory.post('/api/body/create/', data=body_json)
        force_authenticate(request, test_account, test_token)
        response = body_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること'
        )

        self.assertEqual(
            Body.objects.count(),
            2,
            'データが登録されている',
        )

        self.assertEqual(
            float(response_data['weight']),
            body_json['weight'],
            '更新された体重が返却されている'
        )

        self.assertEqual(
            float(response_data['fat_rate']),
            body_json['fat_rate'],
            '更新された体脂肪率が返却されている'
        )

        self.assertNotEqual(
            float(response_data['fat_weight']),
            body_json['fat_weight'],
            'POSTした体脂肪量が返却されない'
        )

        self.assertEqual(
            float(response_data['fat_weight']),
            body_json['weight'] * body_json['fat_rate'] / 100,
            '体脂肪量は体重と体脂肪率で計算された値が返却されている'
        )

    def test_create_body_api_no_auth(self):
        """
        体調情報登録テスト（認証情報なし）
        """
        test_body_data = Body.objects.all().first()

        body_json = {
            'date': test_body_data.date + datetime.timedelta(days=-1),
            'weight': 40.0,
            'fat_rate': 10.0,
            'fat_weight': 20.0,
        }

        factory = APIRequestFactory()
        body_create_view = views.CreateBodyView.as_view()

        request = factory.post('/api/body/create/', data=body_json)
        response = body_create_view(request)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

    def test_update_body_api(self):
        """
        体調情報更新テスト
        """
        test_body_data = Body.objects.all().first()
        test_body_data_updated_at = test_body_data.updated_at
        test_account = test_body_data.account
        test_token = Token.objects.get(user=test_account)

        yesterday = test_body_data.date + datetime.timedelta(days=-1)
        test_body_data_y = BodyFactory(date=yesterday)
        test_body_data_y_updated_at = test_body_data_y.updated_at

        body_json = {
            'date': test_body_data.date,
            'weight': 40.0,
            'fat_rate': 10.0,
            'fat_weight': 20.0,
        }

        factory = APIRequestFactory()
        body_update_view = views.UpdateBodyView.as_view()

        request = factory.patch(f'/api/body/update/{test_body_data.date}', data=body_json)
        force_authenticate(request, test_account, test_token)
        response = body_update_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること'
        )

        # 対象データの更新情報をチェック
        self.assertEqual(
            float(response_data['weight']),
            body_json['weight'],
            '更新された体重が返却されている'
        )

        self.assertEqual(
            float(response_data['fat_rate']),
            body_json['fat_rate'],
            '更新された体脂肪率が返却されている'
        )

        self.assertNotEqual(
            float(response_data['fat_weight']),
            body_json['fat_weight'],
            'POSTした体脂肪量が返却されない'
        )

        self.assertEqual(
            float(response_data['fat_weight']),
            body_json['weight'] * body_json['fat_rate'] / 100,
            '体脂肪量は体重と体脂肪率で計算された値が返却されている'
        )

        # 対象データの更新情報をチェック
        check_updated_data = Body.objects.get(
            account=test_account,
            date=test_body_data.date
        )

        self.assertEqual(
            float(response_data['weight']),
            check_updated_data.weight,
            '体重が更新されている'
        )

        self.assertEqual(
            float(response_data['fat_rate']),
            check_updated_data.fat_rate,
            '体脂肪率が更新されている'
        )

        self.assertNotEqual(
            body_json['fat_weight'],
            float(check_updated_data.fat_weight),
            'POSTされた体脂肪量で更新されてない'
        )

        self.assertEqual(
            float(response_data['fat_weight']),
            float(check_updated_data.fat_weight),
            '体脂肪量は体重と体脂肪率で計算された値で更新されている'
        )

        self.assertNotEqual(
            test_body_data_updated_at,
            check_updated_data.updated_at,
            '更新日が更新されていることを確認'
        )

        # 対象外のデータは更新されていないことを確認
        check_updated_data_y = Body.objects.get(
            account=test_account,
            date=test_body_data_y.date,
        )

        self.assertNotEqual(
            body_json['weight'],
            float(check_updated_data_y.weight),
            '体重が更新されていない'
        )

        self.assertNotEqual(
            body_json['fat_rate'],
            check_updated_data_y.fat_rate,
            '体脂肪率が更新されていない'
        )

        self.assertNotEqual(
            body_json['fat_weight'],
            float(check_updated_data_y.fat_weight),
            'POSTされた体脂肪量で更新されてない'
        )

        self.assertEqual(
            check_updated_data_y.updated_at,
            test_body_data_y_updated_at,
            '更新日が更新されていない'
        )

    def test_update_body_api_no_auth(self):
        """
        体調情報更新テスト（認証情報なし）
        """
        test_body_data = Body.objects.all().first()

        body_json = {
            'date': test_body_data.date,
            'weight': 40.0,
            'fat_rate': 10.0,
            'fat_weight': 20.0,
        }

        factory = APIRequestFactory()
        body_update_view = views.UpdateBodyView.as_view()

        request = factory.patch(f'/api/body/update/{test_body_data.date}', data=body_json)
        response = body_update_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

    def test_update_body_api_nother_account_body_data(self):
        """
        体調情報更新テスト（別ユーザーデータ更新）
        """
        test_body_data = Body.objects.all().first()
        test_account = AccountFactory(email="body_views_test@test.com")
        test_token = Token.objects.get(user=test_account)

        body_json = {
            'date': test_body_data.date,
            'weight': 40.0,
            'fat_rate': 10.0,
            'fat_weight': 20.0,
        }

        factory = APIRequestFactory()
        body_update_view = views.UpdateBodyView.as_view()

        request = factory.patch(f'/api/body/update/{test_body_data.date}', data=body_json)
        force_authenticate(request, test_account, test_token)
        response = body_update_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            'HTTPステータス404であること'
        )

    def test_delete_body_api(self):
        """
        体調情報削除テスト
        """
        test_body_data = Body.objects.all().first()
        test_account = test_body_data.account
        test_token = Token.objects.get(user=test_account)

        test_body_data_y = BodyFactory(date=test_body_data.date + datetime.timedelta(days=-1))
        body_data_count = Body.objects.count()

        factory = APIRequestFactory()
        body_delete_view = views.DeleteBodyView.as_view()

        request = factory.delete(f'/api/body/delete/{test_body_data.date}')
        force_authenticate(request, test_account, test_token)
        response = body_delete_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            'HTTPステータス204であること'
        )

        self.assertEqual(
            Body.objects.filter(account=test_account, date=test_body_data.date).count(),
            0,
            '当日分のデータが削除されている',
        )

        self.assertEqual(
            Body.objects.filter(account=test_account, date=test_body_data_y.date).count(),
            1,
            '前日分のデータが削除されていない',
        )

    def test_delete_body_api_no_auth(self):
        """
        体調情報更新テスト（認証情報なし）
        """
        test_body_data = Body.objects.all().first()

        factory = APIRequestFactory()
        body_delete_view = views.DeleteBodyView.as_view()

        request = factory.delete(f'/api/body/delete/{test_body_data.date}')
        response = body_delete_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

    def test_delete_body_api_nother_account_body_data(self):
        """
        体調情報削除テスト（別ユーザーデータ削除）
        """
        test_body_data = Body.objects.all().first()
        test_account = AccountFactory(email="body_views_test@test.com")
        test_token = Token.objects.get(user=test_account)

        factory = APIRequestFactory()
        body_delete_view = views.DeleteBodyView.as_view()

        request = factory.delete(f'/api/body/delete/{test_body_data.date}')
        force_authenticate(request, test_account, test_token)
        response = body_delete_view(request, date=test_body_data.date)
        response_data = response.data

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            'HTTPステータス404であること'
        )
