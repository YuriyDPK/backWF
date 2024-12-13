// models/PaymentMethod.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const Address = require('./Address');
const User = require('./User');

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: { // Уникальный идентификатор способа оплаты
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
  card_number: { // Номер карты
    type: DataTypes.STRING,
    allowNull: false
  },
  cardholder_name: { // Имя владельца карты
    type: DataTypes.STRING,
    allowNull: false
  },
  expiration_date: { // Срок действия карты
    type: DataTypes.DATE,
    allowNull: false
  },
  billing_address_id: { // Адрес для выставления счета
    type: DataTypes.INTEGER,
    references: {
      model: Address,
      key: 'id'
    },
    allowNull: false
  },
  is_default: { // Является ли этот способ оплаты основным
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'PaymentMethod' // указание имени таблицы
});

module.exports = PaymentMethod;
