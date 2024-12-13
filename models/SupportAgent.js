// models/SupportAgent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const SupportAgent = sequelize.define('SupportAgent', {
  id: { // Уникальный идентификатор агента поддержки
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { // Имя агента поддержки
    type: DataTypes.STRING,
    allowNull: false
  },
  role: { // Роль агента поддержки
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'SupportAgent' // указание имени таблицы
});

module.exports = SupportAgent;
