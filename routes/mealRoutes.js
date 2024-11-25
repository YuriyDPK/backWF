// routes/mealRoutes.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Meal = require("../models/Meal");

const router = express.Router();

// Настройка хранения файлов с использованием multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/meal");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Создание нового блюда
router.post("/", upload.single("image"), async (req, res) => {
  const { category, name, cost, description } = req.body;
  const image_url = req.file ? req.file.path : null;

  if (!category || !name) {
    return res
      .status(400)
      .json({ error: "Необходимо указать категорию и название блюда" });
  }

  try {
    const meal = await Meal.create({
      category,
      name,
      cost,
      description,
      image_url,
    });
    return res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение всех блюд
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.findAll();
    return res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение блюда по ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: "Блюдо не найдено" });
    }

    return res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение блюд по категории
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const meals = await Meal.findAll({ where: { category } });

    if (meals.length === 0) {
      return res
        .status(404)
        .json({ error: "Блюда не найдены для указанной категории" });
    }

    return res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обновление блюда по ID
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { category, name, cost, description } = req.body;
  const image_url = req.file ? req.file.path : null;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: "Блюдо не найдено" });
    }

    // Удаление старого изображения, если загружено новое
    if (image_url && meal.image_url) {
      fs.unlink(path.join(__dirname, "../", meal.image_url), (err) => {
        if (err) console.error("Ошибка при удалении файла: ", err);
      });
    }

    await meal.update({
      category,
      name,
      cost,
      description,
      image_url: image_url || meal.image_url,
    });
    return res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Удаление блюда по ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: "Блюдо не найдено" });
    }

    // Удаление изображения блюда
    if (meal.image_url) {
      fs.unlink(path.join(__dirname, "../", meal.image_url), (err) => {
        if (err) console.error("Ошибка при удалении файла: ", err);
      });
    }

    await meal.destroy();

    return res.status(200).json({ message: "Блюдо успешно удалено" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
