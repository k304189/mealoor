import datetime
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.body import Body
from ..factories.account import AccountFactory

class BodyModelTestCase(TestCase):
    """
    Bodyモデルのテスト
    """

    def test_create_body(self):
        """
        体調作成のテスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        test_weight = 60
        test_fat_rate = 15
        test_fat_weight = 1
        Body(
            account=test_account,
            date=test_date,
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(), 1, 'データが登録されている'
        )

        create_body = Body.objects.get(account=test_account, date = test_date)
        self.assertEqual(
            create_body.weight, test_weight, '指定された体重が登録されている'
        )
        self.assertEqual(
            create_body.fat_rate, test_fat_rate, '指定された体脂肪率が登録されている'
        )
        self.assertNotEqual(
            create_body.fat_weight, test_fat_weight, '指定された体脂肪量が登録されていない'
        )
        self.assertEqual(
            create_body.fat_weight,
            (test_weight * test_fat_rate / 100),
            '体脂肪量は体重と体脂肪率で計算された値である'
        )

    def test_create_body_same_account_another_date(self):
        """
        体調作成（同アカウント・別日）のテスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        test_weight = 60
        test_fat_rate = 15
        test_fat_weight = 1
        Body(
            account=test_account,
            date=test_date,
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()

        Body(
            account=test_account,
            date=test_date + datetime.timedelta(days=-1),
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()

        self.assertEqual(
            Body.objects.count(), 2, 'データが2件登録されている'
        )

    def test_create_body_another_account_same_date(self):
        """
        体調作成（別アカウント・同日）のテスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_account2 = AccountFactory(email='test_body_model@test.com')
        test_date = datetime.date.today()
        test_weight = 60
        test_fat_rate = 15
        test_fat_weight = 1
        Body(
            account=test_account,
            date=test_date,
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()

        Body(
            account=test_account2,
            date=test_date,
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()

        self.assertEqual(
            Body.objects.count(), 2, 'データが2件登録されている'
        )

    def test_create_body_duplicate_data(self):
        """
        体調の重複登録エラーテスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        test_weight = 60
        test_fat_rate = 15
        test_fat_weight = 1
        Body(
            account=test_account,
            date=test_date,
            weight=test_weight,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()

        with self.assertRaises(IntegrityError, msg='アカウントと日付が同じデータは登録できない'):
            Body(
                account=test_account,
                date=test_date,
                weight=70,
                fat_rate=20,
                fat_weight=30,
            ).save()

    def test_create_body_weight_max_value_validator(self):
        """
        体調の体重の最大値テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        test_fat_rate = 15
        test_fat_weight = 1

        Body(
            account=test_account,
            date=test_date,
            weight=999.99,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体重の最大値999.99が登録できる'
        )

        with self.assertRaises(DataError, msg='体重が1000は登録できない'):
            Body(
                account=test_account,
                date=test_date + datetime.timedelta(days=-1),
                weight=1000,
                fat_rate=test_fat_rate,
                fat_weight=test_fat_weight,
            ).save()

    def test_create_body_weight_min_value_validator(self):
        """
        体調の体重の最小値テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        test_fat_rate = 15
        test_fat_weight = 1

        Body(
            account=test_account,
            date=test_date + datetime.timedelta(days=-2),
            weight=0.00,
            fat_rate=test_fat_rate,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体重の最小値0.00が登録できる'
        )

        with self.assertRaises(ValidationError, msg='体重が-0.01は登録できない'):

            Body(
                account=test_account,
                date=test_date + datetime.timedelta(days=-3),
                weight=-0.01,
                fat_rate=test_fat_rate,
                fat_weight=test_fat_weight,
            ).save()

    def test_create_body_fat_rate_max_value_validator(self):
        """
        体調の体脂肪率の最大値テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        fat_weight = 60
        test_fat_weight = 1

        Body(
            account=test_account,
            date=test_date,
            weight=fat_weight,
            fat_rate=99.99,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体脂肪率の最大値999.99が登録できる'
        )

        with self.assertRaises(DataError, msg='体脂肪率が100は登録できない'):
            Body(
                account=test_account,
                date=test_date + datetime.timedelta(days=-1),
                weight=fat_weight,
                fat_rate=100,
                fat_weight=test_fat_weight,
            ).save()

    def test_create_body_fat_rate_min_value_validator(self):
        """
        体調の体脂肪率の最小値テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        fat_weight = 60
        test_fat_weight = 1

        Body(
            account=test_account,
            date=test_date,
            weight=fat_weight,
            fat_rate=0.00,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体脂肪率の最大値0.00が登録できる'
        )

        with self.assertRaises(ValidationError, msg='体脂肪率が-0.01は登録できない'):
            Body(
                account=test_account,
                date=test_date + datetime.timedelta(days=-1),
                weight=fat_weight,
                fat_rate=-0.01,
                fat_weight=test_fat_weight,
            ).save()

    def test_create_body_max_weight_and_fat_rate(self):
        """
        体調・体脂肪率最大値登録テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        max_weight = 100.00
        max_fat_rate = 99.99
        test_fat_weight = 20

        Body(
            account=test_account,
            date=test_date,
            weight=max_weight,
            fat_rate=max_fat_rate,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体重・体脂肪率の最大値が登録できる'
        )

    def test_create_body_min_weight_and_fat_rate(self):
        """
        体調・体脂肪率最小値登録テスト
        """
        self.assertEqual(
            Body.objects.count(), 0, 'データが0件である'
        )
        test_account = AccountFactory()
        test_date = datetime.date.today()
        min_weight = 0.00
        min_fat_rate = 0.00
        test_fat_weight = 20

        Body(
            account=test_account,
            date=test_date,
            weight=min_weight,
            fat_rate=min_fat_rate,
            fat_weight=test_fat_weight,
        ).save()
        self.assertEqual(
            Body.objects.count(),
            1,
            '体重・体脂肪率の最小値が登録できる'
        )
