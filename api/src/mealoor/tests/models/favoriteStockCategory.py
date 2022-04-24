from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.favoriteStockCategory import FavoriteStockCategory
from ..factories.favoriteStock import FavoriteStockFactory
from ..factories.favoriteStockCategory import FavoriteStockCategoryFactory

class FavoriteStockCategoryTestCase(TestCase):
    """
    FavoriteStockCategoryモデルのテスト
    """

    def test_create_favorite_stock_category(self):
        """
        食事カテゴリー作成のテスト
        """
        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_stock_category = FavoriteStockCategory(
            favorite_stock=FavoriteStockFactory(),
            category="米",
            amount=200,
            unit="kg",
        )

        favorite_stock_category.save()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_stock_category = FavoriteStockCategory.objects.first()

        self.assertEqual(
            created_favorite_stock_category.favorite_stock,
            favorite_stock_category.favorite_stock,
            '指定のお気に入り食材データで登録されている',
        )

        self.assertEqual(
            created_favorite_stock_category.category, favorite_stock_category.category, '指定のカテゴリーが登録されている'
        )

        self.assertEqual(
            created_favorite_stock_category.amount, favorite_stock_category.amount, '指定の量が登録されている'
        )

        self.assertEqual(
            created_favorite_stock_category.unit, favorite_stock_category.unit, '指定の単位が登録されている'
        )

        self.assertIsNotNone(created_favorite_stock_category.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_favorite_stock_category.updated_at, 'データ更新日に値がセットされている')

    def test_create_favorite_stock_category_favorite_stock_is_none(self):
        """
        お気に入り食材がセットされていない
        """

        with self.assertRaises(IntegrityError, msg='お気に入り食事データなしでは登録できない'):
            FavoriteStockCategory(
                category="米",
                amount=200,
                unit="kg",
            ).save()

    def test_create_favorite_stock_category_category_is_none(self):
        """
        カテゴリーがセットされていない
        """

        with self.assertRaises(IntegrityError, msg='カテゴリーなしでは登録できない'):
            FavoriteStockCategory(
                favorite_stock=FavoriteStockFactory(),
                category=None,
                amount=200,
                unit="kg",
            ).save()

    def test_create_favorite_stock_category_category_length_is_15(self):
        """
        カテゴリーが15文字
        """

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        FavoriteStockCategory(
            favorite_stock=FavoriteStockFactory(),
            category = "a" * 15,
            amount=200,
            unit="kg",
        ).save()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_category_category_length_is_16(self):
        """
        カテゴリーが16文字
        """

        with self.assertRaises(DataError, msg='カテゴリーが16文字以上は登録できない'):
            FavoriteStockCategory(
                favorite_stock=FavoriteStockFactory(),
                category="a" * 16,
                amount=200,
                unit="kg",
            ).save()

    def test_create_favorite_stock_category_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        FavoriteStockCategory(
            favorite_stock=FavoriteStockFactory(),
            category="米",
            amount=0,
            unit="kg",
        ).save()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_category_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            FavoriteStockCategory(
                favorite_stock=FavoriteStockFactory(),
                category="米",
                amount=-1,
                unit="kg",
            ).save()

    def test_create_favorite_stock_category_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        FavoriteStockCategory(
            favorite_stock=FavoriteStockFactory(),
            category="米",
            amount=200,
            unit="a" * 10,
        ).save()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_stock_category_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            FavoriteStockCategory(
                favorite_stock=FavoriteStockFactory(),
                category="米",
                amount=200,
                unit="a" * 11,
            ).save()

    def test_delete_favorite_stock_category_when_related_favorite_stock_is_deleted(self):
        """
        お気に入り食材データが削除時にお気に入り食材カテゴリーデータ削除
        """

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_stock_category = FavoriteStockCategoryFactory()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが1件である'
        )

        favorite_stock_category.favorite_stock.delete()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが削除されていることを確認'
        )

    def test_delete_stock_favorite_category_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時にお気に入り食材カテゴリーデータ削除
        """

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_stock_category = FavoriteStockCategoryFactory()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 1, 'データが1件である'
        )

        favorite_stock_category.favorite_stock.account.delete()

        self.assertEqual(
            FavoriteStockCategory.objects.count(), 0, 'データが削除されていることを確認'
        )
