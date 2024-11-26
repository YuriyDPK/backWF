// routes/userChoiceRoutes.js
const express = require('express');
const UserChoice = require('../models/UserChoice'); // Импорт модели UserChoice
const Dish = require('../models/Dish'); // Импорт модели Dish (для проверки связей)

const router = express.Router();

// === Маршруты для модели UserChoice ===

// 1. Создание нового пользовательского выбора
router.post('/', async (req, res) => {
  const { user_id, dish_id, removed_ingredients } = req.body;

  try {
    // Проверяем, существует ли указанное блюдо
    const dish = await Dish.findByPk(dish_id);
    if (!dish) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }

    const newUserChoice = await UserChoice.create({
      user_id,
      dish_id,
      removed_ingredients: removed_ingredients ? JSON.stringify(removed_ingredients) : null,
    });

    return res.status(201).json(newUserChoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании пользовательского выбора' });
  }
});

// 2. Получение всех пользовательских выборов
router.get('/', async (req, res) => {
  try {
    const userChoices = await UserChoice.findAll();
    return res.status(200).json(userChoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении пользовательских выборов' });
  }
});

// 3. Получение пользовательских выборов по ID пользователя
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userChoices = await UserChoice.findAll({ where: { user_id: userId } });

    if (userChoices.length === 0) {
      return res.status(404).json({ error: 'Выборы пользователя не найдены' });
    }

    return res.status(200).json(userChoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении пользовательских выборов' });
  }
});

// 4. Обновление пользовательского выбора по ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { removed_ingredients } = req.body;

  try {
    const userChoice = await UserChoice.findByPk(id);

    if (!userChoice) {
      return res.status(404).json({ error: 'Пользовательский выбор не найден' });
    }

    await userChoice.update({
      removed_ingredients: removed_ingredients ? JSON.stringify(removed_ingredients) : userChoice.removed_ingredients,
    });

    return res.status(200).json(userChoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении пользовательского выбора' });
  }
});

// 5. Удаление пользовательского выбора по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userChoice = await UserChoice.findByPk(id);

    if (!userChoice) {
      return res.status(404).json({ error: 'Пользовательский выбор не найден' });
    }

    await userChoice.destroy();

    return res.status(200).json({ message: 'Пользовательский выбор успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении пользовательского выбора' });
  }
});

module.exports = router;
