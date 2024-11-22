// models/UserMealSchedule.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const UserMealSchedule = sequelize.define('UserMealSchedule', {
  id: { // Уникальный идентификатор графика приема пищи пользователя
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_schedule_id: { // Идентификатор графика доставки
    type: DataTypes.INTEGER,
    references: {
      model: 'DeliverySchedules',
      key: 'id'
    },
    allowNull: false
  },
  meal_id: { // Идентификатор блюда
    type: DataTypes.INTEGER,
    references: {
      model: 'Meals',
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
  tableName: 'user_meal_schedules' // указание имени таблицы
});

module.exports = UserMealSchedule;
