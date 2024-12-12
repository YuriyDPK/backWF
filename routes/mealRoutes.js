// routes/mealRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Meal = require('../models/Meal'); // Импорт модели Meal
const Ingredient = require('../models/Ingredient'); // Импорт модели Meal
const { log } = require('console');

const router = express.Router();

// Настройка хранения файлов для изображений приемов пищи
const storage = multer.diskStorage({
  destination: './uploads/meals', // Папка для сохранения файлов
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  },
});
const upload = multer({ storage });

// === Маршруты для модели Meal ===

// 1. Создание нового приема пищи
router.post('/', upload.single('image'), async (req, res) => {
  const { name, meal_type, calories, protein, fats, carbs, description } = req.body;

  try {
    const imageUrl = req.file ? `/uploads/meals/${req.file.filename}` : null;

    const newMeal = await Meal.create({
      name,
      meal_type,
      calories,
      protein,
      fats,
      carbs,
      description,
      image_url: imageUrl,
    });

    return res.status(201).json(newMeal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании приема пищи' });
  }
});

// 2. Получение списка всех приемов пищи
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.findAll();
    return res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении приемов пищи' });
  }
});
// Получение списка всех приемов пищи вместе с ингредиентами
router.get('/with-ingridients', async (req, res) => {
  try {
    const meals = await Meal.findAll({
      include: [
        {
          model: Ingredient,
          through: { attributes: [] }, // Для модели MealIngredient
          attributes: ['id', 'name', 'calories', 'protein', 'fats', 'carbs', 'weight'],
        },
      ],
    });
    console.log(meals);
    
    return res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении приемов пищи' });
  }
});
// 3. Получение одного приема пищи по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Прием пищи не найден' });
    }

    return res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении приема пищи' });
  }
});

// 4. Обновление приема пищи по ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, meal_type, calories, protein, fats, carbs, description } = req.body;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Прием пищи не найден' });
    }

    // Если загружается новое изображение, добавляем его путь
    const imageUrl = req.file ? `/uploads/meals/${req.file.filename}` : meal.image_url;

    await meal.update({
      name,
      meal_type,
      calories,
      protein,
      fats,
      carbs,
      description,
      image_url: imageUrl,
    });

    return res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении приема пищи' });
  }
});

// 5. Удаление приема пищи по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Прием пищи не найден' });
    }

    await meal.destroy();

    return res.status(200).json({ message: 'Прием пищи успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении приема пищи' });
  }
});

module.exports = router;
