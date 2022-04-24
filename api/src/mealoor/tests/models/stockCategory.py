from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.stockCategory import StockCategory
from ..factories.stock import StockFactory
from ..factories.stockCategory import StockCategoryFactory

class StockCategoryTestCase(TestCase):
    """
    StockCategoryモデルのテスト
    """

    def test_create_stock_category(self):
        """
        食材カテゴリーのテスト
        """
        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        stock_category = StockCategory(
            stock=StockFactory(),
            category="米",
            amount=200,
            unit="kg",
        )

        eat_category.save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

        created_stock_category = StockCategory.objects.first()

        self.assertEqual(
            created_stock_category.eat, stock_category.eat, '指定の食材データで登録されている'
        )

        self.assertEqual(
            created_stock_category.category, stock_category.category, '指定のカテゴリーが登録されている'
        )

        self.assertEqual(
            created_stock_category.amount, stock_category.amount, '指定の量が登録されている'
        )

        self.assertEqual(
            created_stock_category.unit, stock_category.unit, '指定の単位が登録されている'
        )

        self.assertIsNotNone(created_stock_category.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_stock_category.updated_at, 'データ更新日に値がセットされている')

    def test_create_stock_category_eat_is_none(self):
        """
        食材がセットされていない
        """

        with self.assertRaises(IntegrityError, msg='食材データなしでは登録できない'):
            stock_category = StockCategory(
                category="米",
                amount=200,
                unit="kg",
            )
            stock_category.save()

    def test_create_stock_category_category_is_none(self):
        """
        カテゴリーがセットされていない
        """

        with self.assertRaises(IntegrityError, msg='カテゴリーなしでは登録できない'):
            stock_category = StockCategory(
                stock=StockFactory(),
                category=None,
                amount=200,
                unit="kg",
            )
            eat_category.save()

    def test_create_stock_category_category_length_is_15(self):
        """
        カテゴリーが15文字
        """

        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        StockCategory(
            stock=StockFactory(),
            category = "a" * 15,
            amount=200,
            unit="kg",
        ).save()

        self.assertEqual(
            StockCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_category_category_length_is_16(self):
        """
        カテゴリーが16文字
        """

        with self.assertRaises(DataError, msg='カテゴリーが16文字以上は登録できない'):
            StockCategory(
                stock=StockFactory(),
                category="a" * 16,
                amount=200,
                unit="kg",
            ).save()

    def test_create_stock_category_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        StockCategory(
            stock=StockFactory(),
            category="米",
            amount=0,
            unit="kg",
        ).save()

        self.assertEqual(
            StockCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_category_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            StockCategory(
                stock=StockFactory(),
                category="米",
                amount=-1,
                unit="kg",
            ).save()

    def test_create_stock_category_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        StockCategory(
            stock=StockFactory(),
            category="米",
            amount=200,
            unit="a" * 10,
        ).save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_stock_category_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            StockCategory(
                stock=StockFactory(),
                category="米",
                amount=200,
                unit="a" * 11,
            ).save()

    def test_delete_stock_category_when_related_stock_is_deleted(self):
        """
        食材データが削除時に食材カテゴリーデータ削除
        """

        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        stock_caategory = StockCategoryFactory()

        self.assertEqual(
            StockCategory.objects.count(), 1, 'データが1件である'
        )

        stock_category.stock.delete()

        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが削除されていることを確認'
        )

    def test_delete_stock_category_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時に食材カテゴリーデータ削除
        """

        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが0件である'
        )

        stock_caategory = StockCategoryFactory()

        self.assertEqual(
            StockCategory.objects.count(), 1, 'データが1件である'
        )

        stock_category.stock.account.delete()

        self.assertEqual(
            StockCategory.objects.count(), 0, 'データが削除されていることを確認'
        )
