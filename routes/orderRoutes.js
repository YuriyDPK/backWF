// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order'); // Импорт модели Order
const MealPlan = require('../models/MealPlan'); // Импорт модели MealPlan (для проверки связей)
const router = express.Router();

// === Маршруты для модели Order ===

// 1. Создание нового заказа
router.post('/', async (req, res) => {
  const { user_id, meal_plan_id, start_date, end_date, total_price } = req.body;

  try {
    // Проверяем, существует ли указанный план питания
    const mealPlan = await MealPlan.findByPk(meal_plan_id);
    if (!mealPlan) {
      return res.status(404).json({ error: 'План питания не найден' });
    }

    const newOrder = await Order.create({
      user_id,
      meal_plan_id,
      start_date,
      end_date,
      total_price,
      status: 'pending', // По умолчанию статус "в ожидании"
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
});

// 2. Получение списка всех заказов
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении заказов' });
  }
});

// 3. Получение заказа по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении заказа' });
  }
});

// 4. Обновление статуса заказа по ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    // Обновляем статус заказа
    await order.update({ status });

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении статуса заказа' });
  }
});

// 5. Удаление заказа по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    await order.destroy();

    return res.status(200).json({ message: 'Заказ успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении заказа' });
  }
});

module.exports = router;
