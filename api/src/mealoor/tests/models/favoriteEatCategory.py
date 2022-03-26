from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.favoriteEatCategory import FavoriteEatCategory
from ..factories.favoriteEat import FavoriteEatFactory

class EatModelTestCase(TestCase):
    """
    FavoriteEatCategoryモデルのテスト
    """

    def test_create_favorite_eat_category(self):
        """
        食事カテゴリー作成のテスト
        """
        self.assertEqual(
            FavoriteEatCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_eat_category = FavoriteEatCategory(
            favorite_eat=FavoriteEatFactory(),
            category="米",
            amount=200,
            unit="kg",
        )

        favorite_eat_category.save()

        self.assertEqual(
            FavoriteEatCategory.objects.count(), 1, 'データが登録されている'
        )

        created_favorite_eat_category = FavoriteEatCategory.objects.first()

        self.assertEqual(
            created_favorite_eat_category.favorite_eat, favorite_eat_category.favorite_eat, '指定の食事データで登録されている'
        )

        self.assertEqual(
            created_favorite_eat_category.category, favorite_eat_category.category, '指定のカテゴリーが登録されている'
        )

        self.assertEqual(
            created_favorite_eat_category.amount, favorite_eat_category.amount, '指定の量が登録されている'
        )

        self.assertEqual(
            created_favorite_eat_category.unit, favorite_eat_category.unit, '指定の単位が登録されている'
        )

        self.assertIsNotNone(created_favorite_eat_category.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_favorite_eat_category.updated_at, 'データ更新日に値がセットされている')

    def test_create_favorite_eat_category_eat_is_none(self):
        """
        お気に入り食事がセットされていない
        """

        with self.assertRaises(IntegrityError, msg='食事データなしでは登録できない'):
            favorite_eat_category = FavoriteEatCategory(
                category="米",
                amount=200,
                unit="kg",
            )
            favorite_eat_category.save()

    def test_create_favorite_eat_category_category_is_none(self):
        """
        カテゴリーがセットされていない
        """

        with self.assertRaises(IntegrityError, msg='カテゴリーなしでは登録できない'):
            favorite_eat_category = FavoriteEatCategory(
                favorite_eat=FavoriteEatFactory(),
                category=None,
                amount=200,
                unit="kg",
            )
            favorite_eat_category.save()

    def test_create_favorite_eat_category_category_length_is_15(self):
        """
        カテゴリーが15文字
        """

        self.assertEqual(
            FavoriteEatCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_eat_category = FavoriteEatCategory(
            favorite_eat=FavoriteEatFactory(),
            category = "a" * 15,
            amount=200,
            unit="kg",
        )
        favorite_eat_category.save()

        self.assertEqual(
            FavoriteEatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_category_category_length_is_16(self):
        """
        カテゴリーが16文字
        """

        with self.assertRaises(DataError, msg='カテゴリーが16文字以上は登録できない'):
            favorite_eat_category = FavoriteEatCategory(
                favorite_eat=FavoriteEatFactory(),
                category="a" * 16,
                amount=200,
                unit="kg",
            )
            favorite_eat_category.save()

    def test_create_favorite_eat_category_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            FavoriteEatCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_eat_category = FavoriteEatCategory(
            favorite_eat=FavoriteEatFactory(),
            category="米",
            amount=0,
            unit="kg",
        )
        favorite_eat_category.save()

        self.assertEqual(
            FavoriteEatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_category_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            favorite_eat_category = FavoriteEatCategory(
                favorite_eat=FavoriteEatFactory(),
                category="米",
                amount=-1,
                unit="kg",
            )
            favorite_eat_category.save()

    def test_create_favorite_eat_category_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            FavoriteEatCategory.objects.count(), 0, 'データが0件である'
        )

        favorite_eat_category = FavoriteEatCategory(
            favorite_eat=FavoriteEatFactory(),
            category="米",
            amount=200,
            unit="a" * 10,
        )
        favorite_eat_category.save()

        self.assertEqual(
            FavoriteEatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_favorite_eat_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            favorite_eat_category = FavoriteEatCategory(
                favorite_eat=FavoriteEatFactory(),
                category="米",
                amount=200,
                unit="a" * 11,
            )
            favorite_eat_category.save()
