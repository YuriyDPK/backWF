// routes/mealPlanRoutes.js
const express = require('express');
const MealPlan = require('../models/MealPlan'); // Импорт модели MealPlan
const Goal = require('../models/Goal'); // Импорт модели Goal (для проверки связей)

const router = express.Router();

// === Маршруты для модели MealPlan ===

// 1. Создание нового плана питания
router.post('/', async (req, res) => {
  const { goal_id, duration_days, price_per_day, bonus_points, discount_percentage } = req.body;

  try {
    // Проверяем, существует ли указанная цель
    const goal = await Goal.findByPk(goal_id);
    if (!goal) {
      return res.status(404).json({ error: 'Цель не найдена' });
    }

    const newMealPlan = await MealPlan.create({
      goal_id,
      duration_days,
      price_per_day,
      bonus_points,
      discount_percentage,
    });

    return res.status(201).json(newMealPlan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании плана питания' });
  }
});

// 2. Получение списка всех планов питания
router.get('/', async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll();
    return res.status(200).json(mealPlans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении планов питания' });
  }
});

// 3. Получение планов питания по ID цели
router.get('/goal/:goalId', async (req, res) => {
  const { goalId } = req.params;

  try {
    const mealPlans = await MealPlan.findAll({ where: { goal_id: goalId } });

    if (mealPlans.length === 0) {
      return res.status(404).json({ error: 'Планы питания для указанной цели не найдены' });
    }

    return res.status(200).json(mealPlans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении планов питания' });
  }
});

// 4. Обновление плана питания по ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { duration_days, price_per_day, bonus_points, discount_percentage } = req.body;

  try {
    const mealPlan = await MealPlan.findByPk(id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'План питания не найден' });
    }

    await mealPlan.update({
      duration_days,
      price_per_day,
      bonus_points,
      discount_percentage,
    });

    return res.status(200).json(mealPlan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении плана питания' });
  }
});

// 5. Удаление плана питания по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const mealPlan = await MealPlan.findByPk(id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'План питания не найден' });
    }

    await mealPlan.destroy();

    return res.status(200).json({ message: 'План питания успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении плана питания' });
  }
});

module.exports = router;
