from django.test import TestCase

from mealoor.models.account import Account
from ..factories.account import AccountFactory

test_email = 'AccountModelsTestCase@test.com'
test_username = 'AccountModelsTestCase'

class AccountModelsTestCase(TestCase):
    """
    Accountモデルのテスト
    """

    def test_create_account(self):
        """
        アカウント作成のテスト
        """
        account = AccountFactory(
            email=test_email,
            username=test_username,
            first_name='AccountModels',
            last_name = 'TestCase',
            profile = 'プロフィール1\nprofile2\nプロフィール3',
            is_active=False,
            is_staff=True,
            is_superuser=True,
        )
        self.assertEqual(
            account.email, test_email, 'メールが指定したものになっている'
        )
        self.assertEqual(
            account.username, test_username, '名前が指定したものになっている'
        )
        self.assertEqual(
            account.first_name,
            'AccountModels',
            '名前（姓）が指定したものになっている'
        )
        self.assertEqual(
            account.last_name, 'TestCase', '名前（名）が指定したものになっている'
        )
        self.assertEqual(
            account.profile,
            'プロフィール1\nprofile2\nプロフィール3',
            'プロフィールが指定されたものになっている'
        )
        self.assertFalse(account.is_active, '有効が指定されたものになっている')
        self.assertTrue(
            account.is_staff, 'スタッフ権限が指定されたものになっている'
        )
        self.assertTrue(
            account.is_superuser,
            'スーパーユーザー権限が指定されたものになっている'
        )
        self.assertIsNotNone(
            account.created_at, '登録日に値が入っている'
        )
        self.assertIsNotNone(
            account.updated_at, '更新日に値が入っている'
        )

    def test_create_account_only_key_column(self):
        """
        アカウント作成のテスト（キー項目のみ）
        """
        account = AccountFactory(
            email=test_email,
            username=test_username,
        )
        self.assertEqual(
            account.email, test_email, 'メールが指定したものになっている'
        )
        self.assertEqual(
            account.username, test_username, '名前が指定したものになっている'
        )
        self.assertIsNone(account.first_name, '名前（姓）が空白になっている')
        self.assertIsNone(account.last_name, '名前（名）が空白になっている')
        self.assertIsNone(account.profile, 'プロフィールが空白になっている')
        self.assertTrue(account.is_active, '有効になっている')
        self.assertFalse(
            account.is_staff, 'スタッフ権限が付与されていない'
        )
        self.assertFalse(
            account.is_superuser,
            'スーパーユーザー権限が付与されていない'
        )
        self.assertIsNotNone(
            account.created_at, '登録日に値が入っている'
        )
        self.assertIsNotNone(
            account.updated_at, '更新日に値が入っている'
        )

    def test_create_account_same_email(self):
        """
        アカウント作成のテスト（メール重複NG）
        """
        account1 = AccountFactory(
            email=test_email,
            username=test_username,
        )
        account2 = AccountFactory(
            email=test_email,
            username=test_username,
        )
        self.assertEqual(
            Account.objects.count(), 1, 'データが1件しか登録されていない'
        )

    def test_create_account_not_null(self):
        """
        アカウント作成のテスト（必須項目チェック）
        """
        with self.assertRaises(Exception, msg='メールが空白で登録できない'):
            AccountFactory(email=None)

        with self.assertRaises(Exception, msg='名前が空白で登録できない'):
            AccountFactory(username=None)

    def test_update_account(self):
        """
        アカウント更新のテスト
        """
        account = AccountFactory(email=test_email, username=test_username)

        before_created_at = account.created_at
        before_updated_at = account.updated_at

        update_email = 'update_email@email.com'
        account.email = update_email
        account.save()

        self.assertEqual(
            Account.objects.filter(email=test_email).count(),
            0,
            '更新前データは存在していない',
        )

        self.assertEqual(
            Account.objects.filter(email=update_email).count(),
            1,
            '更新後データは存在していない',
        )

        self.assertEqual(
            account.created_at, before_created_at, "作成日は更新されない"
        )

        self.assertNotEqual(
            account.updated_at, before_updated_at, "更新日は更新されない"
        )

    def test_update_account_same_email(self):
        """
        アカウント更新のテスト（メールアドレス）
        """
        account1 = AccountFactory(email=test_email, username=test_username)
        account2_email = 'update_email@email.com'
        account2 = AccountFactory(email=account2_email, username=test_username)

        with self.assertRaises(
            Exception,
            msg='すでに登録されているメールアドレスに更新できない',
        ):
            account2.email = test_email
            account2.save()

    def test_update_account_same_username(self):
        """
        アカウント更新のテスト（名前）
        """
        account1 = AccountFactory(email=test_email, username=test_username)
        account2 = AccountFactory(
            email="update_email@email.com",
            username='update_account'
        )

        account2.username = test_username
        account2.save()

        self.assertEqual(
            Account.objects.filter(username=test_username).count(),
            2,
            'すでに存在しているユーザー名に更新することができる'
        )

    def test_over_max_word_length_column_value(self):
        """
        アカウントの最大桁超過チェック
        """
        with self.assertRaises(
            Exception,
            msg='メールアドレスが256文字以上は登録できない'
        ):
            AccountFactory(email='a'*256)

        with self.assertRaises(
            Exception,
            msg='ユーザー名が61文字以上は登録できない'
        ):
            AccountFactory(username='a'*61)

        with self.assertRaises(
            Exception,
            msg='名前（姓）が31文字以上は登録できない'
        ):
            AccountFactory(first_name='a'*31)

        with self.assertRaises(
            Exception,
            msg='名前（名）が31文字以上は登録できない'
        ):
            AccountFactory(last_name='a'*31)

    def test_max_word_length_column_value(self):
        """
        アカウントの最大桁チェック
        """
        account = AccountFactory(
            email='a'*255,
            username='a'*60,
            first_name='a'*30,
            last_name='a'*30,
        )

        self.assertEqual(Account.objects.count(), 1, '最大桁指定は登録できる')
