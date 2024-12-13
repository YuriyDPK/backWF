// models/UserMeal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const Meal = require('./Meal');
const User = require('./User');

const UserMeal = sequelize.define('UserMeal', {
  id: { // Уникальный идентификатор связи пользователя и блюда
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  meal_id: { // Идентификатор блюда
    type: DataTypes.INTEGER,
    references: {
      model: Meal,
      key: 'id'
    },
    allowNull: false
  },
  customization_details: { // Детали кастомизации блюда пользователем
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_excluded: { // Флаг исключения блюда из рациона
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'UserMeal' // указание имени таблицы
});

module.exports = UserMeal;
