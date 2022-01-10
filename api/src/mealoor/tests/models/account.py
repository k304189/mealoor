from django.test import TestCase

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
