// routes/goalRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Goal = require('../models/Goal'); // Импорт модели Goal
const { log } = require('console');

const router = express.Router();

// Настройка хранения файлов для изображений целей с помощью multer
const storage = multer.diskStorage({
  destination: './uploads/goals', // Папка для сохранения файлов
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  },
});
const upload = multer({ storage });

// === Маршруты для модели Goal ===

// 1. Создание новой цели
router.post('/', upload.single('image'), async (req, res) => {
  const { name, calories, meals_count, description, price_per_day } = req.body;

  try {
    const imageUrl = req.file ? `/uploads/goals/${req.file.filename}` : null;

    const newGoal = await Goal.create({
      name,
      calories,
      meals_count,
      description,
      price_per_day,
      image_url: imageUrl,
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при создании цели' });
  }
});

// 2. Получение списка всех целей
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.findAll();
    return res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении целей' });
  }
});

// 3. Получение одной цели по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ error: 'Цель не найдена' });
    }

    return res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении цели' });
  }
});

// 4. Получение целей по набору ID
router.post('/batch', async (req, res) => {
  const { ids } = req.body;
  
 
  
  try {
    const goals = await Goal.findAll({
      where: {
        id: ids,
      },
    });
    
    return res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при получении целей' });
  }
});

// 5. Обновление цели по ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, calories, meals_count, description, price_per_day } = req.body;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ error: 'Цель не найдена' });
    }

    // Если загружается новое изображение, добавляем его путь
    const imageUrl = req.file ? `/uploads/goals/${req.file.filename}` : goal.image_url;

    await goal.update({
      name,
      calories,
      meals_count,
      description,
      price_per_day,
      image_url: imageUrl,
    });

    return res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при обновлении цели' });
  }
});

// 6. Удаление цели по ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ error: 'Цель не найдена' });
    }

    await goal.destroy();

    return res.status(200).json({ message: 'Цель успешно удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при удалении цели' });
  }
});

module.exports = router;
