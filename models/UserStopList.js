// models/UserStopList.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const User = require('./User');
const Meal = require('./Meal');

const UserStopList = sequelize.define('UserStopList', {
  id: { // Уникальный идентификатор стоп-листа пользователя
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
  reason: { // Причина добавления в стоп-лист
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'UserStopList' // указание имени таблицы
});

module.exports = UserStopList;
