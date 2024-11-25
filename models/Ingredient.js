// models/Ingredient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // подключение к базе данных

const Ingredient = sequelize.define(
  "Ingredient",
  {
    id: {
      // Уникальный идентификатор ингредиента
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // Название ингредиента
      type: DataTypes.STRING,
      allowNull: false,
    },
    describe: {
      // Описание
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      // Вес ингредиента
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    protein: {
      // Количество белка
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fat: {
      // Количество жиров
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbs: {
      // Количество углеводов
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    kcal: {
      // Калорийность ингредиента
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "ingredients", // указание имени таблицы
  }
);

module.exports = Ingredient;
