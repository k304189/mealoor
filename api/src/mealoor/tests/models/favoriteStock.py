import datetime
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.favoriteStock import FavoriteStock
from ..factories.account import AccountFactory
from ..factories.favoriteStock import FavoriteStockFactory

class FavoriteStockTestCase(TestCase):
    """
    FavoriteStockモデルのテスト
    """

    def test_create_favorite_stock(self):
        """
        よく買う食料作成のテスト
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        favorite_stock = FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            registered_name="登録時の名前",
            quantity=1,
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

        favorite_stock.save()
        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_stock = FavoriteStock.objects.first()

        self.assertEqual(
            created_favorite_stock.account, favorite_stock.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_favorite_stock.name, favorite_stock.name, '名前が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.eat_type, favorite_stock.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_stock.food_type, favorite_stock.food_type, '食料タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_stock.registered_name,
            favorite_stock.registered_name,
            '食材登録名が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.quantity, favorite_stock.quantity, '個数が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.shop, favorite_stock.shop, '店が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.price, favorite_stock.price, '価格が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.kcal, favorite_stock.kcal, 'カロリーが登録されている'
        )

        self.assertEqual(
            created_favorite_stock.amount, favorite_stock.amount, '量が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.unit, favorite_stock.unit, '単位が登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.protein), favorite_stock.protein, 'タンパク質が登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.lipid), favorite_stock.lipid, '脂質が登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.carbo), favorite_stock.carbo, '炭水化物が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.note, favorite_stock.note, 'メモが登録されている'
        )

        self.assertIsNotNone(
            created_favorite_stock.created_at, 'データ作成日が登録されている'
        )

        self.assertIsNotNone(
            created_favorite_stock.updated_at, 'データ登録日が登録されている'
        )

    def test_create_favorite_stock_only_require_columns(self):
        """
        必須項目のみのよく買う食料作成のテスト
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        favorite_stock = FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
        )

        favorite_stock.save()
        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_stock = FavoriteStock.objects.first()

        self.assertEqual(
            created_favorite_stock.account, favorite_stock.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_favorite_stock.name, favorite_stock.name, '名前が登録されている'
        )

        self.assertEqual(
            created_favorite_stock.eat_type, favorite_stock.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_favorite_stock.food_type, favorite_stock.food_type, '食料タイプが登録されている'
        )

        self.assertIsNone(
            created_favorite_stock.registered_name, '食材登録名がNoneで登録されている'
        )

        self.assertEqual(
            created_favorite_stock.quantity, 1, '個数が1で登録されている'
        )

        self.assertIsNone(
            created_favorite_stock.shop, '店がNoneで登録されている'
        )

        self.assertEqual(
            created_favorite_stock.price, 0, '価格が0で登録されている'
        )

        self.assertEqual(
            created_favorite_stock.kcal, 0, 'カロリーが0で登録されている'
        )

        self.assertEqual(
            created_favorite_stock.amount, 0, '量が0で登録されている'
        )

        self.assertIsNone(
            created_favorite_stock.unit, '単位がNoneで登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.protein), 0.0, 'タンパク質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.lipid), 0.0, '脂質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_favorite_stock.carbo), 0.0, '炭水化物が0.0で登録されている'
        )

        self.assertIsNone(
            created_favorite_stock.note, 'メモがNone登録されている'
        )

        self.assertIsNotNone(
            created_favorite_stock.created_at, 'データ作成日が登録されている'
        )

        self.assertIsNotNone(
            created_favorite_stock.updated_at, 'データ登録日が登録されている'
        )

    def test_create_favorite_stock_account_is_none(self):
        """
        アカウントがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='アカウントなしでは登録できない'):
            FavoriteStock(
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
            ).save()

    def test_create_favorite_stock_name_length_is_60(self):
        """
        名前が60文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="a" * 60,
            eat_type="自炊",
            food_type="料理",
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_name_length_is_61(self):
        """
        名前が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="a" * 61,
                eat_type="自炊",
                food_type="料理",
            ).save()

    def test_create_favorite_stock_eat_type_is_none(self):
        """
        食事タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事タイプなしでは登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type=None,
                food_type="料理",
            ).save()

    def test_create_favorite_stock_eat_type_length_is_10(self):
        """
        食事タイプが10文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="a" * 10,
            food_type="料理",
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_eat_type_length_is_11(self):
        """
        食事タイプが11文字
        """
        with self.assertRaises(DataError, msg='食事タイプが11文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="a" * 11,
                food_type="料理",
            ).save()

    def test_create_favorite_stock_food_type_is_none(self):
        """
        食料タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食料タイプなしでは登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type=None,
            ).save()

    def test_create_favorite_stock_food_type_length_is_10(self):
        """
        食料タイプが10文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="a" * 10,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_food_type_length_is_11(self):
        """
        食料タイプが11文字
        """
        with self.assertRaises(DataError, msg='食料タイプが11文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="a" * 11,
            ).save()

    def test_create_favorite_stock_registered_name_length_is_60(self):
        """
        食材登録名が60文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            registered_name="a" * 60,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_registered_name_length_is_61(self):
        """
        食材登録名が61文字
        """
        with self.assertRaises(DataError, msg='食材登録名が61文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                registered_name="a" * 61,
            ).save()

    def test_create_favorite_stock_shop_length_is_10(self):
        """
        店が60文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            shop="a" * 60,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_shop_length_is_11(self):
        """
        店が61文字
        """
        with self.assertRaises(DataError, msg='店が61文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                shop="a" * 61,
            ).save()

    def test_create_favorite_stock_price_is_0(self):
        """
        価格が0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            price=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_price_is_minus(self):
        """
        価格がマイナス
        """
        with self.assertRaises(IntegrityError, msg='価格がマイナスでは登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                price=-1,
            ).save()

    def test_create_favorite_stock_kcal_is_0(self):
        """
        カロリーが0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            kcal=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_kcal_is_minus(self):
        """
        カロリーがマイナス
        """
        with self.assertRaises(IntegrityError, msg='カロリーがマイナスでは登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                kcal=-1,
            ).save()

    def test_create_favorite_stock_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            amount=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                amount=-1,
            ).save()

    def test_create_favorite_stock_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            unit="a" * 10,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            FavoriteStock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                unit="a" * 11,
            ).save()

    def test_create_favorite_stock_protein_is_0(self):
        """
        タンパク質が0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            protein=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_lipid_is_0(self):
        """
        脂質が0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            lipid=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_carbo_is_0(self):
        """
        炭水化物が0
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            carbo=0,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_note_length_is_100(self):
        """
        メモが100文字
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        FavoriteStock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            note="a" * 100,
        ).save()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが登録されている'
        )

    def test_delete_favorite_stock_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時によく買う食材データ削除
        """
        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )

        favorite_stock = FavoriteStockFactory()

        self.assertEqual(
            FavoriteStock.objects.count(), 1, 'データが0件である'
        )

        favorite_stock.account.delete()

        self.assertEqual(
            FavoriteStock.objects.count(), 0, 'データが0件である'
        )
