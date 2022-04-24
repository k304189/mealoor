import datetime
from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.use import Use
from ..factories.use import UseFactory
from ..factories.stock import StockFactory
from ..factories.eat import EatFactory

class UseModelTestCase(TestCase):
    """
    Useモデルのテスト
    """

    def test_create_use(self):
        """
        使用履歴作成のテスト
        """
        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )
        stock = StockFactory(name='卵')
        use = Use(
            stock=stock,
            use_type='処分',
            date=datetime.date.today(),
            rate=100,
            note="テスト\nコメント"
        )

        use.save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        created_use = Use.objects.first()

        self.assertEqual(
            created_use.stock, use.stock, '指定使用食材で登録されている'
        )

        self.assertEqual(
            created_use.use_type, use.use_type, '使用区分が登録されている'
        )

        self.assertEqual(
            created_use.date, use.date, '使用日が登録されている'
        )

        self.assertEqual(
            created_use.rate, use.rate, '使用率が登録されている'
        )

        self.assertEqual(
            created_use.note, use.note, 'メモが登録されている'
        )

        self.assertIsNotNone(created_use.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_use.updated_at, 'データ更新日に値がセットされている')

    def test_create_use_set_created_stock(self):
        """
        使用履歴作成のテスト（作成された食材セット）
        """
        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )
        stock = StockFactory(name='卵')
        created_stock = StockFactory(name='卵')
        use = Use(
            stock=stock,
            use_type='分割',
            date=datetime.date.today(),
            rate=60,
            created_stock=created_stock,
            note="テスト\nコメント"
        )

        use.save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        created_use = Use.objects.first()

        self.assertEqual(
            created_use.created_stock, use.created_stock, '作成された食材が登録されている'
        )

    def test_create_use_set_created_eat(self):
        """
        使用履歴作成のテスト（作成された食事セット）
        """
        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )
        stock = StockFactory(name='卵')
        created_eat = EatFactory(name='目玉焼き')
        use = Use(
            stock=stock,
            use_type='分割',
            date=datetime.date.today(),
            rate=60,
            created_eat=created_eat,
            note="テスト\nコメント"
        )

        use.save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        created_use = Use.objects.first()

        self.assertEqual(
            created_use.created_eat, use.created_eat, '作成された食事が登録されている'
        )

    def test_create_use_only_require_columns(self):
        """
        使用履歴作成のテスト（必須項目のみ）
        """
        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        stock = StockFactory(name='卵')
        use = Use(
            stock=stock,
            use_type='分割',
            date=datetime.date.today(),
        )

        use.save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        created_use = Use.objects.first()

        self.assertEqual(
            created_use.stock, use.stock, '指定使用食材で登録されている'
        )

        self.assertEqual(
            created_use.use_type, use.use_type, '使用区分が登録されている'
        )

        self.assertEqual(
            created_use.date, use.date, '使用日が登録されている'
        )

        self.assertIsNone(
            created_use.created_stock, '作成された食材が登録されている'
        )

        self.assertIsNone(
            created_use.created_eat, '作成された食事が登録されている'
        )

        self.assertEqual(
            created_use.rate, 1, '使用率が1で登録されている'
        )

        self.assertIsNone(
            created_use.note, 'メモがNoneである'
        )

        self.assertIsNotNone(created_use.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_use.updated_at, 'データ更新日に値がセットされている')


    def test_create_use_stock_is_none(self):
        """
        食材がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='使用食材なしでは登録できない'):
            Use(
                use_type='分割',
                date=datetime.date.today(),
            ).save()

    def test_create_use_use_type_is_none(self):
        """
        使用区分がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='使用区分なしでは登録できない'):
            stock = StockFactory(name='卵')
            Use(
                stock=stock,
                use_type=None,
                date=datetime.date.today(),
            ).save()

    def test_create_use_use_type_length_is_10(self):
        """
        使用区分が10文字
        """
        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        stock = StockFactory(name='卵')
        Use(
            stock=stock,
            use_type="a" * 10,
            date=datetime.date.today(),
        ).save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

    def test_create_use_use_type_length_is_11(self):
        """
        使用区分が11文字
        """
        with self.assertRaises(DataError, msg='使用区分なしでは登録できない'):
            stock = StockFactory(name='卵')
            Use(
                stock=stock,
                use_type="a" * 11,
                date=datetime.date.today(),
            ).save()

    def test_create_use_date_is_none(self):
        """
        使用日がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='使用日なしでは登録できない'):
            stock = StockFactory(name='卵')
            Use(
                stock=stock,
                use_type="処分",
                date=None,
            ).save()

    def test_create_use_rate_is_1(self):
        """
        使用率が1
        """
        stock = StockFactory(name='卵')

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        Use(
            stock=stock,
            use_type="処分",
            date=datetime.date.today(),
            rate=1
        ).save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

    def test_create_use_rate_is_100(self):
        """
        使用率が100
        """
        stock = StockFactory(name='卵')

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        Use(
            stock=stock,
            use_type="処分",
            date=datetime.date.today(),
            rate=100
        ).save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

    def test_create_use_note_length_is_100(self):
        """
        メモが100文字
        """
        stock = StockFactory(name='卵')

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        Use(
            stock=stock,
            use_type="処分",
            date=datetime.date.today(),
            rate=100,
            note="a" * 100
        ).save()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

    def test_delete_use_when_stock_is_deleted(self):
        """
        食材データが削除時に使用データ削除
        """

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        use = UseFactory()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        use.stock.delete()

        self.assertEqual(
            Use.objects.count(), 0, 'データが削除されている'
        )

    def test_delete_use_when_account_is_deleted(self):
        """
        アカウントデータが削除時に使用データ削除
        """

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        use = UseFactory()

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        use.stock.account.delete()

        self.assertEqual(
            Use.objects.count(), 0, 'データが削除されている'
        )

    def test_delete_use_when_created_eat_is_deleted(self):
        """
        作成された食事データが削除時に使用データ削除
        """

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        created_eat = EatFactory()
        use = UseFactory(
            created_eat=created_eat
        )

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        use.created_eat.delete()

        self.assertEqual(
            Use.objects.count(), 0, 'データが削除されている'
        )

    def test_use_when_created_stock_is_deleted(self):
        """
        作成された食材データが削除時のテスト
        """

        self.assertEqual(
            Use.objects.count(), 0, 'データが0件である'
        )

        created_stock = StockFactory()
        use = UseFactory(
            created_stock=created_stock
        )

        self.assertEqual(
            Use.objects.count(), 1, 'データが1件である'
        )

        use.created_stock.delete()

        self.assertEqual(
            Use.objects.count(), 0, 'データが削除されている'
        )
