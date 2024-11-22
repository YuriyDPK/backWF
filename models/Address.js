// models/Address.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Address = sequelize.define('Address', {
  id: { // Уникальный идентификатор адреса
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
  address_line: { // Полный адрес
    type: DataTypes.STRING,
    allowNull: false
  },
  city: { // Город
    type: DataTypes.STRING,
    allowNull: false
  },
  postal_code: { // Почтовый индекс
    type: DataTypes.STRING,
    allowNull: true
  },
  latitude: { // Широта
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: { // Долгота
    type: DataTypes.FLOAT,
    allowNull: true
  },
  is_default: { // Является ли адрес основным
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'addresses' // указание имени таблицы
});

module.exports = Address;
