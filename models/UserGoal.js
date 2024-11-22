// models/UserGoal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const UserGoal = sequelize.define('UserGoal', {
  id: { // Уникальный идентификатор связи пользователя и цели
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
  goal_id: { // Идентификатор цели
    type: DataTypes.INTEGER,
    references: {
      model: 'Goals',
      key: 'id'
    },
    allowNull: false
  },
  customization_details: { // Детали кастомизации цели пользователем
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'user_goals' // указание имени таблицы
});

module.exports = UserGoal;
