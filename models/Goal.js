// models/Goal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Goal = sequelize.define('Goal', {
  id: { // Уникальный идентификатор цели
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { // Название цели
    type: DataTypes.STRING,
    allowNull: false
  },
  description: { // Описание цели
    type: DataTypes.TEXT,
    allowNull: true
  },
  kkal_target: { // Целевое количество калорий
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price_range: { // Диапазон цен для достижения цели
    type: DataTypes.STRING,
    allowNull: true
  },
  meal_count: { // Количество приемов пищи
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'goals' // указание имени таблицы
});

module.exports = Goal;
