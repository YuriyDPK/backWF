// models/UserStopList.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const UserStopList = sequelize.define('UserStopList', {
  id: { // Уникальный идентификатор стоп-листа пользователя
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
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
  reason: { // Причина добавления в стоп-лист
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'user_stop_lists' // указание имени таблицы
});

module.exports = UserStopList;
