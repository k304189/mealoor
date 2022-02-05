from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
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
            1,
            'トークンが作成されている'
        )
        self.assertEqual(
            token.first().key,
            response_data["token"],
            '作成されたトークンがレスポンスに存在している'
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

    def test_update_account_api(self):
        """
        ユーザー更新テスト
        """
        before_update_email = 'before_update_email@test.com'
        update_user_email = 'test_update_account_api@test.com'
        update_username = 'test_update_account_api'
        update_first_name = 'test_update'
        update_last_name = 'update_account_api'
        update_profile = '更新後プロフィール'
        update_password = 'password02'

        user_json = {
            'email': update_user_email,
            'username': update_username,
            'first_name': update_first_name,
            'last_name': update_last_name,
            'profile': update_profile,
            'password': update_password,
            'is_active': False,
            'is_staff': True,
            'is_superuser': True,
        }

        test_user = AccountFactory(email=before_update_email)
        test_user_token = Token.objects.get(user=test_user)
        test_user_created_at = test_user.created_at
        test_user_updated_at = test_user.updated_at

        factory = APIRequestFactory()
        account_update_view = views.ManageAccountView.as_view()

        request = factory.patch(
            '/api/account/update',
            data=user_json,
        )
        force_authenticate(request, test_user, test_user_token)
        response = account_update_view(request)

        # レスポンスの確認
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            'HTTPステータス200であること'
        )

        # データの更新の確認
        self.assertNotEqual(
            test_user.email,
            before_update_email,
            'メールアドレスが更新前のアドレスではない'
        )

        self.assertEqual(
            test_user.email,
            update_user_email,
            'メールアドレスがリクエストと同じ'
        )

        self.assertTrue(
            test_user.check_password(update_password),
            'パスワードがリクエストと同じ'
        )

        self.assertEqual(
            test_user.username,
            update_username,
            'ユーザー名がリクエストと同じ'
        )

        self.assertEqual(
            test_user.first_name,
            update_first_name,
            'ユーザー名（姓）がリクエストと同じ'
        )

        self.assertEqual(
            test_user.last_name,
            update_last_name,
            'ユーザー名（名）がリクエストと同じ'
        )

        self.assertEqual(
            test_user.profile,
            update_profile,
            'プロフィールがリクエストと同じ'
        )

        self.assertTrue(
            test_user.is_active,
            '有効フラグは更新されない'
        )

        self.assertFalse(
            test_user.is_staff,
            'スタッフフラグは更新されない'
        )

        self.assertFalse(
            test_user.is_superuser,
            'スーパーユーザーフラグは更新されない'
        )

        self.assertEqual(
            test_user.created_at,
            test_user_created_at,
            '作成日は更新されない'
        )

        self.assertNotEqual(
            test_user.updated_at,
            test_user_updated_at,
            '更新日は更新される'
        )

    def test_update_account_api_no_login(self):
        """
        未ログインによる更新エラー
        """
        no_login_username = 'no_login_username'

        user_json = {
            'username': no_login_username,
        }

        test_user = AccountFactory()
        test_user_updated_at = test_user.updated_at

        factory = APIRequestFactory()
        account_update_view = views.ManageAccountView.as_view()

        request = factory.patch(
            '/api/account/update',
            data=user_json,
        )
        response = account_update_view(request)

        # レスポンスの確認
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            'HTTPステータス401であること'
        )

        # データの更新の確認
        self.assertNotEqual(
            test_user.username,
            no_login_username,
            'ユーザー名が更新されていない'
        )

        self.assertEqual(
            test_user.updated_at,
            test_user_updated_at,
            '更新日が更新されてない'
        )

    def test_update_account_api_exists_email(self):
        """
        すでに存在するメールアドレスの更新エラー
        """
        exists_email = 'exists_email@test.com'

        exists_user = AccountFactory(email=exists_email)
        update_user = AccountFactory()
        update_user_token = Token.objects.get(user=update_user)
        update_user_updated_at = update_user.updated_at

        user_json = {
            'email': exists_email,
        }

        account_update_view = views.ManageAccountView.as_view()
        factory = APIRequestFactory()

        request = factory.patch(
            '/api/account/update',
            data=user_json,
        )
        force_authenticate(request, update_user, update_user_token)
        response = account_update_view(request)

        # レスポンスの確認
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            'HTTPステータス400であること'
        )

        # データの更新の確認
        self.assertNotEqual(
            update_user.email,
            exists_email,
            'メールアドレスが更新されていない'
        )

        self.assertEqual(
            update_user.updated_at,
            update_user_updated_at,
            '更新日が更新されてない'
        )
