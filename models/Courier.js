// models/Courier.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Courier = sequelize.define('Courier', {
  id: { // Уникальный идентификатор курьера
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { // Имя курьера
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: { // Номер телефона курьера
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rating: { // Рейтинг курьера
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'Courier' // указание имени таблицы
});

module.exports = Courier;
