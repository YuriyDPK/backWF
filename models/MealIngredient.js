// models/MealIngredient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // подключение к базе данных
const Meal = require("./Meal");
const Ingredient = require("./Ingredient");

// Создание таблицы для связи "многие ко многому" между Meal и Ingredient
const MealIngredient = sequelize.define(
  "MealIngredient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Meal,
        key: "id",
      },
      allowNull: false,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
        key: "id",
      },
      allowNull: false,
    },
    quantity: {
      // Количество ингредиента для данного блюда (в граммах или других единицах)
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "meal_ingredients", // указание имени таблицы
  }
);

// Определение ассоциаций "многие ко многому" между Meal и Ingredient
Meal.belongsToMany(Ingredient, {
  through: MealIngredient,
  foreignKey: "meal_id",
});
Ingredient.belongsToMany(Meal, {
  through: MealIngredient,
  foreignKey: "ingredient_id",
});

module.exports = MealIngredient;
