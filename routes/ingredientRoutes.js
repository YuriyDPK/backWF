// routes/ingredientRoutes.js
const express = require("express");
const Ingredient = require("../models/Ingredient"); // Импорт модели Ingredient

const router = express.Router();

// Создание нового ингредиента
router.post("/", async (req, res) => {
  const { name, describe, weight, protein, fat, carbs, kcal } = req.body;
  console.log(Ingredient); // Добавьте это, чтобы убедиться, что модель импортирована корректно

  if (!name || !describe) {
    return res
      .status(400)
      .json({ error: "Необходимо указать название и описание ингредиента" });
  }

  try {
    const ingredient = await Ingredient.create({
      name,
      describe,
      weight,
      protein,
      fat,
      carbs,
      kcal,
    });
    return res.status(201).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение всех ингредиентов
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение ингредиента по ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ингредиент не найден" });
    }

    return res.status(200).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обновление ингредиента по ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ингредиент не найден" });
    }

    await ingredient.update(updateData);
    return res.status(200).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Удаление ингредиента по ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ингредиент не найден" });
    }

    await ingredient.destroy();
    return res.status(200).json({ message: "Ингредиент успешно удален" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
