// models/Meal.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // подключение к базе данных

const Meal = sequelize.define(
  "Meal",
  {
    id: {
      // Уникальный идентификатор блюда
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      //  Прием пищи
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      // Название блюда
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      // Количество монет для блюда
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      // Описание блюда
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      // URL изображения блюда
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "meals", // указание имени таблицы
  }
);

module.exports = Meal;
