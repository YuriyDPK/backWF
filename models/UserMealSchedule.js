// models/UserMealSchedule.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const DeliverySchedule = require('./DeliverySchedule');
const Meal = require('./Meal');

const UserMealSchedule = sequelize.define('UserMealSchedule', {
  id: { // Уникальный идентификатор графика приема пищи пользователя
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_schedule_id: { // Идентификатор графика доставки
    type: DataTypes.INTEGER,
    references: {
      model: DeliverySchedule,
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
  time_of_day: { // Время приема пищи
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: { // Количество порций
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'UserMealSchedule' // указание имени таблицы
});

module.exports = UserMealSchedule;
