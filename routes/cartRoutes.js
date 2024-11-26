// routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Добавление цели в корзину
router.post('/', async (req, res) => {
  const { user_id, goal_id, quantity } = req.body;

  if (!user_id || !goal_id) {
    return res.status(400).json({ error: 'Необходимо указать user_id и goal_id' });
  }

  try {
    // Проверяем, есть ли уже эта цель в корзине пользователя
    const existingCartItem = await Cart.findOne({ where: { user_id, goal_id } });
    if (existingCartItem) {
      // Если уже есть, увеличиваем количество
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    }

    // Если нет, добавляем новую цель в корзину
    const newCartItem = await Cart.create({ user_id, goal_id, quantity });
    return res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Ошибка при добавлении цели в корзину:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех целей в корзине пользователя
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const cartItems = await Cart.findAll({ where: { user_id }, include: ['Goal'] });
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Ошибка при получении корзины:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удаление цели из корзины
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Цель в корзине не найдена' });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: 'Цель удалена из корзины' });
  } catch (error) {
    console.error('Ошибка при удалении цели из корзины:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;