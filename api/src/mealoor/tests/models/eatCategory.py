from django.test import TestCase
from django.db.utils import IntegrityError
from django.db.utils import DataError

from mealoor.models.eatCategory import EatCategory
from ..factories.eat import EatFactory
from ..factories.eatCategory import EatCategoryFactory

class EatModelTestCase(TestCase):
    """
    EatCategoryモデルのテスト
    """

    def test_create_eat_category(self):
        """
        食事カテゴリー作成のテスト
        """
        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategory(
            eat=EatFactory(),
            category="米",
            amount=200,
            unit="kg",
        )

        eat_category.save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

        created_eat_category = EatCategory.objects.first()

        self.assertEqual(
            created_eat_category.eat, eat_category.eat, '指定の食事データで登録されている'
        )

        self.assertEqual(
            created_eat_category.category, eat_category.category, '指定のカテゴリーが登録されている'
        )

        self.assertEqual(
            created_eat_category.amount, eat_category.amount, '指定の量が登録されている'
        )

        self.assertEqual(
            created_eat_category.unit, eat_category.unit, '指定の単位が登録されている'
        )

        self.assertIsNotNone(created_eat_category.created_at, 'データ作成日に値がセットされている')

        self.assertIsNotNone(created_eat_category.updated_at, 'データ更新日に値がセットされている')

    def test_create_eat_category_eat_is_none(self):
        """
        食事がセットされていない
        """

        with self.assertRaises(IntegrityError, msg='食事データなしでは登録できない'):
            eat_category = EatCategory(
                category="米",
                amount=200,
                unit="kg",
            )
            eat_category.save()

    def test_create_eat_category_category_is_none(self):
        """
        カテゴリーがセットされていない
        """

        with self.assertRaises(IntegrityError, msg='カテゴリーなしでは登録できない'):
            eat_category = EatCategory(
                eat=EatFactory(),
                category=None,
                amount=200,
                unit="kg",
            )
            eat_category.save()

    def test_create_eat_category_category_length_is_15(self):
        """
        カテゴリーが15文字
        """

        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategory(
            eat=EatFactory(),
            category = "a" * 15,
            amount=200,
            unit="kg",
        )
        eat_category.save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_category_category_length_is_16(self):
        """
        カテゴリーが16文字
        """

        with self.assertRaises(DataError, msg='カテゴリーが16文字以上は登録できない'):
            eat_category = EatCategory(
                eat=EatFactory(),
                category="a" * 16,
                amount=200,
                unit="kg",
            )
            eat_category.save()

    def test_create_eat_category_amount_is_0(self):
        """
        量が0
        """
        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategory(
            eat=EatFactory(),
            category="米",
            amount=0,
            unit="kg",
        )
        eat_category.save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_category_amount_is_minus(self):
        """
        量がマイナス
        """
        with self.assertRaises(IntegrityError, msg='量がマイナスでは登録できない'):
            eat_category = EatCategory(
                eat=EatFactory(),
                category="米",
                amount=-1,
                unit="kg",
            )
            eat_category.save()

    def test_create_eat_category_unit_length_is_10(self):
        """
        単位が10文字
        """
        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategory(
            eat=EatFactory(),
            category="米",
            amount=200,
            unit="a" * 10,
        )
        eat_category.save()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが登録されている'
        )

    def test_create_eat_unit_length_is_11(self):
        """
        単位が11文字
        """
        with self.assertRaises(DataError, msg='単位が11文字では登録できない'):
            eat_category = EatCategory(
                eat=EatFactory(),
                category="米",
                amount=200,
                unit="a" * 11,
            )
            eat_category.save()

    def test_delete_eat_category_when_related_eat_is_deleted(self):
        """
        食事データが削除時に食事カテゴリーデータ削除
        """

        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategoryFactory()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが1件である'
        )

        eat_category.eat.delete()

        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが削除されていることを確認'
        )

    def test_delete_eat_category_when_related_account_is_deleted(self):
        """
        アカウントデータが削除時に食事カテゴリーデータ削除
        """

        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが0件である'
        )

        eat_category = EatCategoryFactory()

        self.assertEqual(
            EatCategory.objects.count(), 1, 'データが1件である'
        )

        eat_category.eat.account.delete()

        self.assertEqual(
            EatCategory.objects.count(), 0, 'データが削除されていることを確認'
        )
