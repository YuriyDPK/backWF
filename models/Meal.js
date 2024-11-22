// models/Meal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Meal = sequelize.define('Meal', {
  id: { // Уникальный идентификатор блюда
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: { // Идентификатор категории блюда
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: { // Название блюда
    type: DataTypes.STRING,
    allowNull: false
  },
  coins: { // Количество монет для блюда
    type: DataTypes.INTEGER,
    allowNull: true
  },
  kkal: { // Калорийность блюда
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: { // Описание блюда
    type: DataTypes.TEXT,
    allowNull: true
  },
  ingredients: { // Список ингредиентов блюда
    type: DataTypes.TEXT,
    allowNull: true
  },
  points_awarded: { // Количество начисляемых очков
    type: DataTypes.INTEGER,
    allowNull: true
  },
  image_url: { // URL изображения блюда
    type: DataTypes.STRING,
    allowNull: true
  },
  goal_id: { // Идентификатор цели, к которой относится блюдо
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'meals' // указание имени таблицы
});

module.exports = Meal;
