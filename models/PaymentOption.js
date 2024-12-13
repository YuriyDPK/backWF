// models/PaymentOption.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const Goal = require('./Goal');

const PaymentOption = sequelize.define('PaymentOption', {
  id: { // Уникальный идентификатор варианта оплаты
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  goal_id: { // Идентификатор цели, к которой привязан вариант оплаты
    type: DataTypes.INTEGER,
    references: {
      model: Goal,
      key: 'id'
    },
    allowNull: false
  },
  duration: { // Длительность оплаты (в днях)
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price_per_day: { // Цена за день
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount: { // Размер скидки (в процентах)
    type: DataTypes.FLOAT,
    allowNull: true
  },
  subscription_available: { // Доступность подписки
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  bonus_points: { // Количество начисляемых бонусных очков
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'PaymentOption' // указание имени таблицы
});

module.exports = PaymentOption;
