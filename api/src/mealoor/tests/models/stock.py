import datetime
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.stock import Stock
from ..factories.account import AccountFactory
from ..factories.stock import StockFactory

class StockModelTestCase(TestCase):
    """
    Stockモデルのテスト
    """

    def test_create_stock(self):
        """
        食料作成のテスト
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        stock = Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            quantity=1,
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

        stock.save()
        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

        created_stock = Stock.objects.first()

        self.assertEqual(
            created_stock.account, stock.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_stock.name, stock.name, '名前が登録されている'
        )

        self.assertEqual(
            created_stock.eat_type, stock.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_stock.food_type, stock.food_type, '食料タイプが登録されている'
        )

        self.assertEqual(
            created_stock.limit, stock.limit, '賞味期限が登録されている'
        )

        self.assertEqual(
            created_stock.location, stock.location, '保管場所が登録されている'
        )

        self.assertEqual(
            created_stock.quantity, stock.quantity, '個数が登録されている'
        )

        self.assertEqual(
            created_stock.remain, 100, '残量が100で登録されている'
        )

        self.assertEqual(
            created_stock.shop, stock.shop, '店が登録されている'
        )

        self.assertEqual(
            created_stock.price, stock.price, '価格が登録されている'
        )

        self.assertEqual(
            created_stock.kcal, stock.kcal, 'カロリーが登録されている'
        )

        self.assertEqual(
            created_stock.amount, stock.amount, '量が登録されている'
        )

        self.assertEqual(
            created_stock.unit, stock.unit, '単位が登録されている'
        )

        self.assertEqual(
            float(created_stock.protein), stock.protein, 'タンパク質が登録されている'
        )

        self.assertEqual(
            float(created_stock.lipid), stock.lipid, '脂質が登録されている'
        )

        self.assertEqual(
            float(created_stock.carbo), stock.carbo, '炭水化物が登録されている'
        )

        self.assertEqual(
            created_stock.discounted, stock.discounted, '割引フラグが登録されている'
        )

        self.assertEqual(
            created_stock.note, stock.note, 'メモが登録されている'
        )

        self.assertIsNotNone(
            created_stock.created_at, 'データ作成日が登録されている'
        )

        self.assertIsNotNone(
            created_stock.updated_at, 'データ登録日が登録されている'
        )

    def test_create_stock_only_require_columns(self):
        """
        必須項目のみの食材登録テスト
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        stock = Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
        )

        stock.save()
        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

        created_stock = Stock.objects.first()

        self.assertEqual(
            created_stock.account, stock.account, '指定アカウントで登録されている'
        )

        self.assertEqual(
            created_stock.name, stock.name, '名前が登録されている'
        )

        self.assertEqual(
            created_stock.eat_type, stock.eat_type, '食事タイプが登録されている'
        )

        self.assertEqual(
            created_stock.food_type, stock.food_type, '食料タイプが登録されている'
        )


        self.assertEqual(
            created_stock.limit, stock.limit, '賞味期限が登録されている'
        )

        self.assertEqual(
            created_stock.location, stock.location, '保管場所が登録されている'
        )

        self.assertEqual(
            created_stock.quantity, 1, '個数が1で登録されている'
        )

        self.assertEqual(
            created_stock.remain, 100, '残量が100で登録されている'
        )

        self.assertIsNone(
            created_stock.shop, '店がNoneで登録されている'
        )

        self.assertEqual(
            created_stock.price, 0, '価格が0で登録されている'
        )

        self.assertEqual(
            created_stock.kcal, 0, 'カロリーが0で登録されている'
        )

        self.assertEqual(
            created_stock.amount, 0, '量が0で登録されている'
        )

        self.assertIsNone(
            created_stock.unit, '単位がNoneで登録されている'
        )

        self.assertEqual(
            float(created_stock.protein), 0.0, 'タンパク質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_stock.lipid), 0.0, '脂質が0.0で登録されている'
        )

        self.assertEqual(
            float(created_stock.carbo), 0.0, '炭水化物が0.0で登録されている'
        )

        self.assertFalse(
            created_stock.discounted, '割引フラグがfalseで登録されている'
        )

        self.assertIsNone(
            created_stock.note, 'メモがNone登録されている'
        )

        self.assertIsNotNone(
            created_stock.created_at, 'データ作成日が登録されている'
        )

        self.assertIsNotNone(
            created_stock.updated_at, 'データ登録日が登録されている'
        )

    def test_create_stock_account_is_none(self):
        """
        アカウントがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='アカウントなしでは登録できない'):
            Stock(
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_name_is_none(self):
        """
        名前がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='名前なしでは登録できない'):
            Stock(
                account=AccountFactory(),
                name=None,
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_name_length_is_60(self):
        """
        名前が60文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="a" * 60,
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_name_length_is_61(self):
        """
        名前が61文字
        """
        with self.assertRaises(DataError, msg='名前が61文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="a" * 61,
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_eat_type_is_none(self):
        """
        食事タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食事タイプなしでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type=None,
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_eat_type_length_is_10(self):
        """
        食事タイプが10文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="a" * 10,
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_eat_type_length_is_11(self):
        """
        食事タイプが11文字
        """
        with self.assertRaises(DataError, msg='食事タイプが11文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="a" * 11,
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_food_type_is_none(self):
        """
        食料タイプがセットされていない
        """
        with self.assertRaises(IntegrityError, msg='食料タイプなしでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type=None,
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_food_type_length_is_10(self):
        """
        食料タイプが10文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="a" * 10,
            limit=datetime.date.today(),
            location="常温",
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_food_type_length_is_11(self):
        """
        食料タイプが11文字
        """
        with self.assertRaises(DataError, msg='食料タイプが11文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="a" * 11,
                limit=datetime.date.today(),
                location="常温",
            ).save()

    def test_create_stock_limit_is_none(self):
        """
        賞味期限がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='賞味期限なしでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=None,
                location="常温",
            ).save()

    def test_create_stock_location_is_none(self):
        """
        保管場所がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='保管場所なしでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location=None,
            ).save()

    def test_create_stock_location_length_is_10(self):
        """
        保管場所が10文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="a" * 10,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_location_length_is_11(self):
        """
        保管場所が11文字
        """
        with self.assertRaises(DataError, msg='保管場所が11文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="a" * 11,
            ).save()

    def test_create_stock_shop_length_is_10(self):
        """
        店が60文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            shop="a" * 60,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_shop_length_is_11(self):
        """
        店が61文字
        """
        with self.assertRaises(DataError, msg='店が61文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
                shop="a" * 61,
            ).save()

    def test_create_stock_price_is_0(self):
        """
        価格が0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            price=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_price_is_minus(self):
        """
        価格がマイナス
        """
        with self.assertRaises(IntegrityError, msg='価格がマイナスでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
                price=-1,
            ).save()

    def test_create_stock_kcal_is_0(self):
        """
        カロリーが0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            kcal=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_kcal_is_minus(self):
        """
        カロリーがマイナス
        """
        with self.assertRaises(IntegrityError, msg='カロリーがマイナスでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
                kcal=-1,
            ).save()

    def test_create_stock_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            amount=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
                amount=-1,
            ).save()

    def test_create_stock_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            unit="a" * 10,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            Stock(
                account=AccountFactory(),
                name="テストネーム",
                eat_type="自炊",
                food_type="料理",
                limit=datetime.date.today(),
                location="常温",
                unit="a" * 11,
            ).save()

    def test_create_stock_protein_is_0(self):
        """
        タンパク質が0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            protein=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_lipid_is_0(self):
        """
        脂質が0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            lipid=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_carbo_is_0(self):
        """
        炭水化物が0
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            carbo=0,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_note_length_is_100(self):
        """
        メモが100文字
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        Stock(
            account=AccountFactory(),
            name="テストネーム",
            eat_type="自炊",
            food_type="料理",
            limit=datetime.date.today(),
            location="常温",
            note="a" * 100,
        ).save()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが登録されている'
        )

    def test_delete_stock_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時に食材データ削除
        """
        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )

        stock = StockFactory()

        self.assertEqual(
            Stock.objects.count(), 1, 'データが1件である'
        )

        stock.account.delete()

        self.assertEqual(
            Stock.objects.count(), 0, 'データが0件である'
        )
