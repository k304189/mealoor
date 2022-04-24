from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.favoriteEat import FavoriteEat
from ..factories.account import AccountFactory
from ..factories.favoriteEat import FavoriteEatFactory

class EatModelTestCase(TestCase):
    """
    FavoriteEatモデルのテスト
    """

    def test_create_favorite_eat(self):
        """
        お気に入り食事作成のテスト
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        favorite_eat = FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            registered_name="登録テスト名",
            amount_note="分量メモ",
            shop="テスト店",
            price=100,
            kcal=200,
            amount=300,
            unit="g",
            protein=40.1,
            lipid=51.2,
            carbo=62.3,
            note="テスト\nコメント"
        )

        favorite_eat.save()
        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_eat = FavoriteEat.objects.first()

        self.assertEqual(
            created_favorite_eat.account, favorite_eat.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_favorite_eat.name, favorite_eat.name, '名前が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.eat_type, favorite_eat.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_eat.food_type, favorite_eat.food_type, '食料タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_eat.registered_name, favorite_eat.registered_name, '食事登録名が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.amount_note, favorite_eat.amount_note, '分量メモが登録されている'
        )

        self.assertEqual(
            created_favorite_eat.shop, favorite_eat.shop, '店が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.price, favorite_eat.price, '価格が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.kcal, favorite_eat.kcal, 'カロリーが登録されている'
        )

        self.assertEqual(
            created_favorite_eat.amount, favorite_eat.amount, '量が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.unit, favorite_eat.unit, '単位が登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.protein), favorite_eat.protein, 'タンパク質が登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.lipid), favorite_eat.lipid, '脂質が登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.carbo), favorite_eat.carbo, '炭水化物が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.note, favorite_eat.note, 'メモが登録されている'
        )

    def test_create_favorite_eat_only_require_columns(self):
        """
        お気に入り食事作成のテスト（必須項目のみ）
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        favorite_eat = FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
        )

        favorite_eat.save()
        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_eat = FavoriteEat.objects.first()

        self.assertEqual(
            created_favorite_eat.account, favorite_eat.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_favorite_eat.name, favorite_eat.name, '名前が登録されている'
        )

        self.assertEqual(
            created_favorite_eat.eat_type, favorite_eat.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_eat.food_type, favorite_eat.food_type, '食料タイプが登録されている'
        )

        self.assertIsNone(
            created_favorite_eat.shop, '店がnullになっている'
        )

        self.assertIsNone(
            created_favorite_eat.registered_name, '食事登録名がnullになっている'
        )

        self.assertIsNone(
            created_favorite_eat.amount_note, '分量メモがnullになっている'
        )

        self.assertEqual(
            created_favorite_eat.price, 0, '価格が0で登録されている'
        )

        self.assertEqual(
            created_favorite_eat.kcal, 0, 'カロリーが0で登録されている'
        )

        self.assertEqual(
            created_favorite_eat.amount, 0, '量が0で登録されている'
        )

        self.assertIsNone(
            created_favorite_eat.unit, '単位がnullで登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.protein), 0.0, 'タンパク質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.lipid), 0.0, '脂質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_favorite_eat.carbo), 0.0, '炭水化物が0.0で登録されている'
        )

        self.assertIsNone(
            created_favorite_eat.note, 'メモがnull登録されている'
        )

    def test_create_favorite_eat_account_is_none(self):
        """
        アカウントがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='アカウントなしでは登録できない'):
            FavoriteEat(
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
            ).save()

    def test_create_favorite_eat_name_is_none(self):
        """
        名前がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='名前なしでは登録できない'):
            favorite_eat = FavoriteEat(
                account=AccountFactory(),
                name=None,
                eat_type="自炊",
                food_type="料理",
            ).save()

    def test_create_favorite_eat_name_length_is_60(self):
        """
        名前が60文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="a"*60,
            eat_type="自炊",
            food_type="料理",
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_name_length_is_61(self):
        """
        名前が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="a" * 61,
                eat_type="自炊",
                food_type="料理",
            ).save()

    def test_create_favorite_eat_eat_type_is_none(self):
        """
        食事タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事タイプなしでは登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type=None,
                food_type="料理",
            ).save()

    def test_create_eat_eat_type_length_is_10(self):
        """
        食事タイプが10文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="a" * 10,
            food_type="料理",
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_eat_type_length_is_11(self):
        """
        食事タイプが11文字
        """
        with self.assertRaises(DataError, msg='食事タイプが11文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="a" * 11,
                food_type="料理",
            ).save()

    def test_create_favorite_eat_food_type_is_none(self):
        """
        食料タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食料タイプなしでは登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type=None,
            ).save()

    def test_create_eat_food_type_length_is_10(self):
        """
        食料タイプが10文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="a" * 10,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_food_type_length_is_11(self):
        """
        食料タイプが11文字
        """
        with self.assertRaises(DataError, msg='食料タイプが11文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="a" * 11,
            ).save()

    def test_create_favorite_eat_registered_name_length_is_60(self):
        """
        食事登録名が60文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            registered_name="a"*60,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_registered_name_length_is_61(self):
        """
        食事登録名が61文字
        """
        with self.assertRaises(DataError, msg='食事登録名が61文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                registered_name="a"*61,
            ).save()

    def test_create_favorite_eat_amount_note_length_is_10(self):
        """
        分量メモが10文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            amount_note="a"*10,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_registered_name_length_is_11(self):
        """
        分量メモが11文字
        """
        with self.assertRaises(DataError, msg='分量メモが11文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                amount_note="a"*11,
            ).save()

    def test_create_favorite_eat_shop_length_is_61(self):
        """
        店が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                shop="a" * 61,
            ).save()

    def test_create_favorite_eat_price_is_0(self):
        """
        価格が0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            price=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_price_is_minus(self):
        """
        価格がマイナス
        """
        with self.assertRaises(IntegrityError, msg='価格がマイナスでは登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                price=-1,
            ).save()

    def test_create_favorite_eat_kcal_is_0(self):
        """
        カロリーが0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            kcal=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_kcal_is_minus(self):
        """
        カロリーがマイナス
        """
        with self.assertRaises(IntegrityError, msg='カロリーがマイナスでは登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                kcal=-1
            ).save()

    def test_create_favorite_eat_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            amount=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                amount=-1
            ).save()

    def test_create_favorite_eat_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            unit="a" * 10,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            FavoriteEat(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                unit="a" * 11,
            ).save()

    def test_create_favorite_eat_protein_is_0(self):
        """
        タンパク質が0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            protein=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_lipid_is_0(self):
        """
        脂質が0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            lipid=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_carbo_is_0(self):
        """
        炭水化物が0
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            carbo=0,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_note_length_is_100(self):
        """
        メモが100文字
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        FavoriteEat(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            note="a" * 100,
        ).save()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが登録されている'
        )

    def test_delete_favorite_eat_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時に食材データ削除
        """
        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )

        favorite_eat = FavoriteEatFactory()

        self.assertEqual(
            FavoriteEat.objects.count(), 1, 'データが1件である'
        )

        favorite_eat.account.delete()

        self.assertEqual(
            FavoriteEat.objects.count(), 0, 'データが0件である'
        )
