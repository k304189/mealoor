from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.cookIngredient import CookIngredient
from ..factories.stock import StockFactory

class CookIngredientModelTestCase(TestCase):
    """
    CookIngredientモデルのテスト
    """

    def test_create_cook_ingredient(self):
        """
        料理材料作成のテスト
        """
        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        cook_ingredient = CookIngredient(
            cook=cook,
            stock=stock,
            rate=30,
        )

        cook_ingredient.save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが1件である'
        )

        created_cook_ingredient = CookIngredient.objects.first()

        self.assertEqual(
            created_cook_ingredient.cook, cook_ingredient.cook, '指定の料理が登録されている'
        )

        self.assertEqual(
            created_cook_ingredient.stock, cook_ingredient.stock, '指定の食材が登録されている'
        )

        self.assertEqual(
            created_cook_ingredient.rate, cook_ingredient.rate, '指定の使用量が登録されている'
        )

        self.assertIsNotNone(created_cook_ingredient.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_cook_ingredient.updated_at, 'データ更新日に値がセットされている')

    def test_create_cook_ingredient_only_require_columns(self):
        """
        料理材料作成のテスト（必須項目のみ）
        """
        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        cook_ingredient = CookIngredient(
            cook=cook,
        )

        cook_ingredient.save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが1件である'
        )

        created_cook_ingredient = CookIngredient.objects.first()

        self.assertEqual(
            created_cook_ingredient.cook, cook_ingredient.cook, '指定の料理が登録されている'
        )

        self.assertIsNone(
            created_cook_ingredient.stock, '食材がNoneで登録されている'
        )

        self.assertEqual(
            created_cook_ingredient.rate, 100, '使用量が100登録されている'
        )

        self.assertIsNotNone(created_cook_ingredient.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_cook_ingredient.updated_at, 'データ更新日に値がセットされている')

    def test_create_cook_ingredient_cook_is_none(self):
        """
        料理がセットされていない
        """
        with self.assertRaises(IntegrityError, msg='アカウントなしでは登録できない'):
            stock = StockFactory(name='卵')
            CookIngredient(
                stock=stock,
                rate=30,
            ).save()

    def test_create_cook_ingredient_rate_is_0(self):
        """
        使用量が1
        """
        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        CookIngredient(
            cook=cook,
            stock=stock,
            rate=0,
        ).save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが登録されている'
        )

    def test_create_cook_ingredient_rate_is_minus(self):
        """
        使用量が0
        """
        with self.assertRaises(IntegrityError, msg='使用量が0では登録できない'):
            cook = StockFactory(name='目玉焼き')
            stock = StockFactory(name='卵')
            CookIngredient(
                cook=cook,
                stock=stock,
                rate=-1,
            ).save()

    def test_create_cook_ingredient_rate_is_100(self):
        """
        使用量が100
        """
        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        CookIngredient(
            cook=cook,
            stock=stock,
            rate=100,
        ).save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが登録されている'
        )

    def test_delete_cook_ingredient_when_cook_is_deleted(self):
        """
        料理データ削除時の料理食材データの削除
        """

        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        cook_ingredient = CookIngredient(
            cook=cook,
            stock=stock,
            rate=100,
        )

        cook_ingredient.save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが登録されている'
        )

        cook_ingredient.cook.delete()

        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが削除されている'
        )

    def test_delete_cook_ingredient_when_cook_account_is_deleted(self):
        """
        料理データ削除時の料理食材データの削除
        """

        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        cook_ingredient = CookIngredient(
            cook=cook,
            stock=stock,
            rate=100,
        )

        cook_ingredient.save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが登録されている'
        )

        cook_ingredient.cook.account.delete()

        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが削除されている'
        )

    def test_delete_cook_ingredient_when_stock_is_deleted(self):
        """
        食材データ削除時の料理食材データの削除
        """

        self.assertEqual(
            CookIngredient.objects.count(), 0, 'データが0件である'
        )

        cook = StockFactory(name='目玉焼き')
        stock = StockFactory(name='卵')
        cook_ingredient = CookIngredient(
            cook=cook,
            stock=stock,
            rate=100,
        )

        cook_ingredient.save()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが登録されている'
        )

        self.assertIsNotNone(
            CookIngredient.objects.first().stock,
            '食材データがNoneでない'
        )

        cook_ingredient.stock.delete()

        self.assertEqual(
            CookIngredient.objects.count(), 1, 'データが削除されていない'
        )

        self.assertIsNone(
            CookIngredient.objects.first().stock,
            '食材データがNoneになっている'
        )
