// routes/mealIngredientRoutes.js
const express = require("express");
const MealIngredient = require("../models/MealIngredient");
const Ingredient = require("../models/Ingredient");

const router = express.Router();

// Добавление ингредиента в блюдо
router.post("/", async (req, res) => {
  const { meal_id, ingredient_id, quantity } = req.body;

  if (!meal_id || !ingredient_id) {
    return res
      .status(400)
      .json({ error: "Необходимо указать идентификаторы блюда и ингредиента" });
  }

  try {
    const mealIngredient = await MealIngredient.create({
      meal_id,
      ingredient_id,
      quantity,
    });
    return res.status(201).json(mealIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Получение всех ингредиентов для конкретного блюда
router.get("/meal/:meal_id", async (req, res) => {
  const { meal_id } = req.params;

  try {
    const ingredients = await MealIngredient.findAll({
      where: { meal_id },
      include: [
        {
          model: Ingredient,
          attributes: [
            "id",
            "name",
            "describe",
            "weight",
            "protein",
            "fat",
            "carbs",
            "kcal",
          ],
        },
      ],
    });
    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обновление количества ингредиента в блюде
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res
      .status(400)
      .json({ error: "Необходимо указать количество ингредиента" });
  }

  try {
    const mealIngredient = await MealIngredient.findByPk(id);

    if (!mealIngredient) {
      return res
        .status(404)
        .json({ error: "Связь между блюдом и ингредиентом не найдена" });
    }

    await mealIngredient.update({ quantity });
    return res.status(200).json(mealIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Удаление ингредиента из блюда
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const mealIngredient = await MealIngredient.findByPk(id);

    if (!mealIngredient) {
      return res
        .status(404)
        .json({ error: "Связь между блюдом и ингредиентом не найдена" });
    }

    await mealIngredient.destroy();
    return res
      .status(200)
      .json({ message: "Ингредиент успешно удален из блюда" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
