from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.authtoken.models import Token

from mealoor.models.account import Account
from ..factories.account import AccountFactory

from mealoor import views

test_email = "accountTest@test.com"
test_username = "AccountTest"

class AccountTests(APITestCase):
    """
    Accountのリクエストテスト
    """
    @classmethod
    def setUpTestData(cls):
        """
        テスト用データ準備
        """
        AccountFactory(email=test_email, username=test_username)

    def test_create_account_api(self):
        """
        ユーザ作成テスト
        """
        create_user_email = 'test_create_account_api@test.com'
        create_username = 'test_create_account_api'
        create_first_name = 'test_create'
        create_last_name = 'account_api'
        create_profile = 'プロフィール'
        create_password = 'password01'

        user_json = {
            'email': create_user_email,
            'username': create_username,
            'first_name': create_first_name,
            'last_name': create_last_name,
            'profile': create_profile,
            'password': create_password,
        }
        factory = APIRequestFactory()
        account_create_view = views.CreateAccountView.as_view()

        request = factory.post('/api/account/create', data=user_json)
        response = account_create_view(request)
        response_data = response.data

        # レスポンスの確認
        # この部分のテストを追加する
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            'HTTPステータス201であること'
        )

        # DBのチェック
        create_account = Account.objects.get(email=create_user_email)
        self.assertTrue(
            create_account.check_password(create_password),
            'パスワードがリクエストと同じ'
        )
        self.assertEqual(
            create_account.username,
            create_username,
            'ユーザー名がリクエストと同じ'
        )
        self.assertEqual(
            create_account.first_name,
            create_first_name,
            'ユーザー名（姓）がリクエストと同じ'
        )
        self.assertEqual(
            create_account.last_name,
            create_last_name,
            'ユーザー名（名）がリクエストと同じ'
        )
        self.assertEqual(
            create_account.profile,
            create_profile,
            'プロフィールがリクエストと同じ'
        )
        self.assertTrue(create_account.is_active, '有効になっている')
        self.assertFalse(
            create_account.is_staff, 'スタッフ権限が付与されていない'
        )
        self.assertFalse(
            create_account.is_superuser,
            'スーパーユーザー権限が付与されていない'
        )
        self.assertIsNotNone(
            create_account.created_at, '登録日に値が入っている'
        )
        self.assertIsNotNone(
            create_account.updated_at, '更新日に値が入っている'
        )

        #トークンのチェック
        token = Token.objects.filter(user=create_account)
        self.assertEqual(
            len(token),
            0,
            'トークンが作成されている'
        )

    def test_create_account_api_exists(self):
        """
        ユーザー存在による登録エラー
        """
        create_user_email = 'test_create_account_api@test.com'
        create_username = 'test_create_account_api'
        create_password = 'password01'

        AccountFactory(email=create_user_email, username="exists_user")

        user_json = {
            'email': create_user_email,
            'username': create_username,
            'password': create_password,
        }
        factory = APIRequestFactory()
        account_create_view = views.CreateAccountView.as_view()

        request = factory.post('/api/account/create', data=user_json)
        response = account_create_view(request)
        response_data = response.data

        # レスポンスの確認
        # この部分のテストを追加する
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            'HTTPステータス400であること'
        )

        # DBのチェック
        create_account = Account.objects.get(email=create_user_email)
        self.assertNotEqual(
            create_account.username,
            create_username,
            'ユーザー名がリクエストと一致しない'
        )

    def test_create_account_api_no_email(self):
        """
        メールアドレスなしによる登録エラー
        """
        create_username = 'test_create_account_api'
        create_password = 'password01'

        user_json = {
            'username': create_username,
            'password': create_password,
        }
        factory = APIRequestFactory()
        account_create_view = views.CreateAccountView.as_view()

        request = factory.post('/api/account/create', data=user_json)
        response = account_create_view(request)
        response_data = response.data

        # レスポンスの確認
        # この部分のテストを追加する
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            'HTTPステータス400であること'
        )

        # DBのチェック
        create_account = Account.objects.filter(username=create_username)
        self.assertEqual(
            len(create_account),
            0,
            'ユーザーが存在しない'
        )

    def test_create_account_api_no_username(self):
        """
        ユーザー名なしによる登録エラー
        """
        create_user_email = 'test_create_account_api@test.com'
        create_password = 'password01'

        user_json = {
            'email': create_user_email,
            'password': create_password,
        }
        factory = APIRequestFactory()
        account_create_view = views.CreateAccountView.as_view()

        request = factory.post('/api/account/create', data=user_json)
        response = account_create_view(request)
        response_data = response.data

        # レスポンスの確認
        # この部分のテストを追加する
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            'HTTPステータス400であること'
        )

        # DBのチェック
        create_account = Account.objects.filter(email=create_user_email)
        self.assertEqual(
            len(create_account),
            0,
            'ユーザーが存在しない'
        )

    def test_create_account_api_password_too_short(self):
        """
        パスワードの文字数不足による登録エラー
        """
        create_user_email = 'test_create_account_api@test.com'
        create_username = 'test_create_account_api'
        create_password = '123456A'

        user_json = {
            'email': create_user_email,
            'username': create_username,
            'password': create_password,
        }
        factory = APIRequestFactory()
        account_create_view = views.CreateAccountView.as_view()

        request = factory.post('/api/account/create', data=user_json)
        response = account_create_view(request)
        response_data = response.data

        # レスポンスの確認
        # この部分のテストを追加する
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            'HTTPステータス400であること'
        )

        # DBのチェック
        create_account = Account.objects.filter(email=create_user_email)
        self.assertEqual(
            len(create_account),
            0,
            'ユーザーが存在しない'
        )


    # def test_create_token_api(self):
    #     """
    #     トークン作成（ログイン）テスト
    #     """
    #     token_user_email = 'test_token_account_api@test.com'
    #     token_username = 'test_token_user'
    #     token_user_password = 'test_token_password01'
    #
    #     user = AccountFactory(
    #         email=token_user_email,
    #         username=token_username,
    #         password=token_user_password
    #     )
    #
    #     u = Account.objects.filter(email=token_user_email)
    #     self.assertEqual(len(u), 1, 'テストユーザー作成')
    #
    #     login_json = {
    #         'email': token_user_email,
    #         'password': token_user_password,
    #     }
    #
    #     factory = APIRequestFactory()
    #     token_create_view = views.CreateTokenView.as_view()
    #
    #     request = factory.post(
    #         '/api/account/token',
    #         data=login_json
    #     )
    #     response = token_create_view(request)
    #     print(response)
    #     self.assertEqual(
    #         response.status_code,
    #         status.HTTP_201_CREATED,
    #         'トークンが作成されている'
    #     )



    # def test_update_account_api(self):
    #     update_user_email = 'test_update_account_api@test.com'
    #     update_username = 'test_update_account_api'
    #     update_first_name = 'test_update'
    #     update_last_name = 'update_account_api'
    #     update_profile = '更新後プロフィール'
    #     update_password = 'password02'
    #
    #     test_user = AccountFactory()
    #
    #     factory = APIRequestFactory()
    #     account_update_view = views.ManageAccountView.as_view()
    #
    #     request = factory.patch('/api/account/update', data=user_json)
    #     response = account_update_view(request)
    #     response_data = response.data
