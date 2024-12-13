// models/Subscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const User = require('./User');
const Goal = require('./Goal');
const PaymentMethod = require('./PaymentMethod');

const Subscription = sequelize.define('Subscription', {
  id: { // Уникальный идентификатор подписки
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
  goal_id: { // Идентификатор цели подписки
    type: DataTypes.INTEGER,
    references: {
      model: Goal,
      key: 'id'
    },
    allowNull: false
  },
  start_date: { // Дата начала подписки
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: { // Дата окончания подписки
    type: DataTypes.DATE,
    allowNull: false
  },
  payment_method_id: { // Идентификатор способа оплаты
    type: DataTypes.INTEGER,
    references: {
      model: PaymentMethod,
      key: 'id'
    },
    allowNull: false
  },
  auto_renewal: { // Флаг автоматического продления подписки
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Subscription' // указание имени таблицы
});

module.exports = Subscription;
