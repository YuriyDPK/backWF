// routes/ingredientRoutes.js
const express = require('express');
const Ingredient = require('../models/Ingredient'); // Импорт модели Ingredient
const Dish = require('../models/Dish'); // Импорт модели Dish (для проверки связей)

const router = express.Router();

// === Маршруты для модели Ingredient ===

// 1. Создание нового ингредиента
router.post('/', async (req, res) => {
  const { dish_id, name, calories, protein, fats, carbs, weight } = req.body;

  try {
    // Проверяем, существует ли указанное блюдо
    const dish = await Dish.findByPk(dish_id);
    if (!dish) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }

    const newIngredient = await Ingredient.create({
      dish_id,
      name,
      calories,
      protein,
      fats,
      carbs,
      weight,
    });

    return res.status(201).json(newIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании ингредиента' });
  }
});

// 2. Получение списка всех ингредиентов
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении ингредиентов' });
  }
});

// 3. Получение ингредиентов по ID блюда
router.get('/dish/:dishId', async (req, res) => {
  const { dishId } = req.params;

  try {
    const ingredients = await Ingredient.findAll({ where: { dish_id: dishId } });

    if (ingredients.length === 0) {
      return res.status(404).json({ error: 'Ингредиенты для указанного блюда не найдены' });
    }

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении ингредиентов' });
  }
});

// 4. Обновление ингредиента по ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, calories, protein, fats, carbs, weight } = req.body;

  try {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ингредиент не найден' });
    }

    await ingredient.update({
      name,
      calories,
      protein,
      fats,
      carbs,
      weight,
    });

    return res.status(200).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении ингредиента' });
  }
});

// 5. Удаление ингредиента по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ингредиент не найден' });
    }

    await ingredient.destroy();

    return res.status(200).json({ message: 'Ингредиент успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении ингредиента' });
  }
});

module.exports = router;
