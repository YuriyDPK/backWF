// routes/dishRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Dish = require('../models/Dish'); // Импорт модели Dish
const Meal = require('../models/Meal'); // Импорт модели Meal (для проверки связей)

const router = express.Router();

// Настройка хранения файлов для изображений блюд
const storage = multer.diskStorage({
  destination: './uploads/dishes', // Папка для сохранения файлов
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  },
});
const upload = multer({ storage });

// === Маршруты для модели Dish ===

// 1. Создание нового блюда
router.post('/', upload.single('image'), async (req, res) => {
  const { meal_id, name, calories, protein, fats, carbs, description } = req.body;

  try {
    // Проверяем, существует ли указанный meal_id
    const meal = await Meal.findByPk(meal_id);
    if (!meal) {
      return res.status(404).json({ error: 'Прием пищи не найден' });
    }

    const imageUrl = req.file ? `/uploads/dishes/${req.file.filename}` : null;

    const newDish = await Dish.create({
      meal_id,
      name,
      calories,
      protein,
      fats,
      carbs,
      description,
      image_url: imageUrl,
    });

    return res.status(201).json(newDish);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании блюда' });
  }
});

// 2. Получение списка всех блюд
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    return res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении блюд' });
  }
});

// 3. Получение блюд по ID приема пищи
router.get('/meal/:mealId', async (req, res) => {
  const { mealId } = req.params;

  try {
    const dishes = await Dish.findAll({ where: { meal_id: mealId } });

    if (dishes.length === 0) {
      return res.status(404).json({ error: 'Блюда для указанного приема пищи не найдены' });
    }

    return res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении блюд' });
  }
});

// 4. Обновление блюда по ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, calories, protein, fats, carbs, description } = req.body;

  try {
    const dish = await Dish.findByPk(id);

    if (!dish) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }

    // Если загружается новое изображение, добавляем его путь
    const imageUrl = req.file ? `/uploads/dishes/${req.file.filename}` : dish.image_url;

    await dish.update({
      name,
      calories,
      protein,
      fats,
      carbs,
      description,
      image_url: imageUrl,
    });

    return res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении блюда' });
  }
});

// 5. Удаление блюда по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findByPk(id);

    if (!dish) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }

    await dish.destroy();

    return res.status(200).json({ message: 'Блюдо успешно удалено' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении блюда' });
  }
});

module.exports = router;
