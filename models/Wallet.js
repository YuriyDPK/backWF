// models/Wallet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Wallet = sequelize.define('Wallet', {
  id: { // Уникальный идентификатор кошелька
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
  balance: { // Баланс кошелька
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  },
  bonus_points: { // Количество бонусных очков
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'wallets' // указание имени таблицы
});

module.exports = Wallet;
