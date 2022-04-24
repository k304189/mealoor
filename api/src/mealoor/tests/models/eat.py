import datetime
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.eat import Eat
from ..factories.account import AccountFactory
from ..factories.eat import EatFactory

class EatModelTestCase(TestCase):
    """
    Eatモデルのテスト
    """

    def test_create_eat(self):
        """
        食事作成のテスト
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        eat = Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            shop="テスト店",
            price=100,
            kcal=200,
            amount=300,
            unit="g",
            protein=40.1,
            lipid=51.2,
            carbo=62.3,
            discounted=True,
            note="テスト\nコメント"
        )

        eat.save()
        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

        created_eat = Eat.objects.first()

        self.assertEqual(
            created_eat.account, eat.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_eat.name, eat.name, '名前が登録されている'
        )

        self.assertEqual(
            created_eat.eat_type, eat.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_eat.food_type, eat.food_type, '食料タイプが登録されている'
        )

        self.assertEqual(
            created_eat.date, eat.date, '食事日が登録されている'
        )

        self.assertEqual(
            created_eat.shop, eat.shop, '店が登録されている'
        )

        self.assertEqual(
            created_eat.price, eat.price, '価格が登録されている'
        )

        self.assertEqual(
            created_eat.kcal, eat.kcal, 'カロリーが登録されている'
        )

        self.assertEqual(
            created_eat.amount, eat.amount, '量が登録されている'
        )

        self.assertEqual(
            created_eat.unit, eat.unit, '単位が登録されている'
        )

        self.assertEqual(
            float(created_eat.protein), eat.protein, 'タンパク質が登録されている'
        )

        self.assertEqual(
            float(created_eat.lipid), eat.lipid, '脂質が登録されている'
        )

        self.assertEqual(
            float(created_eat.carbo), eat.carbo, '炭水化物が登録されている'
        )

        self.assertEqual(
            created_eat.discounted, eat.discounted, '割引フラグが登録されている'
        )

        self.assertEqual(
            created_eat.note, eat.note, 'メモが登録されている'
        )

    def test_create_eat_only_require_columns(self):
        """
        食事作成のテスト
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        eat = Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
        )

        eat.save()
        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

        created_eat = Eat.objects.first()

        self.assertEqual(
            created_eat.account, eat.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_eat.name, eat.name, '名前が登録されている'
        )

        self.assertEqual(
            created_eat.eat_type, eat.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_eat.food_type, eat.food_type, '食料タイプが登録されている'
        )

        self.assertEqual(
            created_eat.date, eat.date, '食事日が登録されている'
        )

        self.assertIsNone(
            created_eat.shop, '店がnullになっている'
        )

        self.assertEqual(
            created_eat.price, 0, '価格が0で登録されている'
        )

        self.assertEqual(
            created_eat.kcal, 0, 'カロリーが0で登録されている'
        )

        self.assertEqual(
            created_eat.amount, 0, '量が0で登録されている'
        )

        self.assertIsNone(
            created_eat.unit, '単位がnullで登録されている'
        )

        self.assertEqual(
            float(created_eat.protein), 0.0, 'タンパク質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_eat.lipid), 0.0, '脂質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_eat.carbo), 0.0, '炭水化物が0.0で登録されている'
        )

        self.assertFalse(
            created_eat.discounted, '割引フラグがfalseで登録されている'
        )

        self.assertIsNone(
            created_eat.note, 'メモがnull登録されている'
        )

    def test_create_eat_account_is_none(self):
        """
        アカウントがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='アカウントなしでは登録できない'):
            eat = Eat(
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_name_is_none(self):
        """
        名前がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='名前なしでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name=None,
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_name_length_is_60(self):
        """
        名前が60文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="a"*60,
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_name_length_is_61(self):
        """
        名前が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="a" * 61,
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_eat_type_is_none(self):
        """
        食事タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事タイプなしでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type=None,
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_eat_type_length_is_10(self):
        """
        食事タイプが10文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_eat_type_length_is_11(self):
        """
        食事タイプが11文字
        """
        with self.assertRaises(DataError, msg='食事タイプが11文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="a" * 11,
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_food_type_is_none(self):
        """
        食料タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食料タイプなしでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type=None,
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_food_type_length_is_10(self):
        """
        食料タイプが10文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="a" * 10,
            date=datetime.date.today(),
            eat_timing="朝食",
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_food_type_length_is_11(self):
        """
        食料タイプが11文字
        """
        with self.assertRaises(DataError, msg='食料タイプが11文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="a" * 11,
                date=datetime.date.today(),
                eat_timing="朝食",
            ).save()

    def test_create_eat_date_is_none(self):
        """
        食事日がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事日なしでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=None,
                eat_timing="朝食",
            ).save()

    def test_create_eat_eat_timing_is_none(self):
        """
        食事タイミングがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事タイミングなしでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing=None,
            ).save()

    def test_create_eat_eat_timing_length_is_10(self):
        """
        食事タイミングが10文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="a" * 10,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_eat_timing_length_is_11(self):
        """
        食事タイミングが11文字
        """
        with self.assertRaises(DataError, msg='食事タイミングが11文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="a" * 11,
            ).save()

    def test_create_eat_shop_length_is_60(self):
        """
        店が60文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            shop="a" * 60,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_shop_length_is_61(self):
        """
        店が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
                shop="a" * 61,
            ).save()

    def test_create_eat_price_is_0(self):
        """
        価格が0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            price=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_price_is_minus(self):
        """
        価格がマイナス
        """
        with self.assertRaises(IntegrityError, msg='価格がマイナスでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
                price=-1,
            ).save()

    def test_create_eat_kcal_is_0(self):
        """
        カロリーが0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            kcal=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_kcal_is_minus(self):
        """
        カロリーがマイナス
        """
        with self.assertRaises(IntegrityError, msg='カロリーがマイナスでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
                kcal=-1
            ).save()

    def test_create_eat_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            amount=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
                amount=-1
            ).save()

    def test_create_eat_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            unit="a" * 10,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            eat = Eat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                date=datetime.date.today(),
                eat_timing="朝食",
                unit="a" * 11,
            ).save()

    def test_create_eat_protein_is_0(self):
        """
        タンパク質が0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            protein=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_lipid_is_0(self):
        """
        脂質が0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            lipid=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_carbo_is_0(self):
        """
        炭水化物が0
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            carbo=0,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_note_length_is_100(self):
        """
        メモが100文字
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        Eat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            date=datetime.date.today(),
            eat_timing="朝食",
            note="a" * 100,
        ).save()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが登録されている'
        )

    def test_delete_eat_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時に食事データ削除
        """
        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )

        eat = EatFactory()

        self.assertEqual(
            Eat.objects.count(), 1, 'データが0件である'
        )

        eat.account.delete()

        self.assertEqual(
            Eat.objects.count(), 0, 'データが0件である'
        )
