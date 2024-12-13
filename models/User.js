// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date_birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  profile_picture: {
    type: DataTypes.STRING, // предполагается, что это URL
    allowNull: true
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: true
  },
  loyalty_status: {
    type: DataTypes.STRING,
    defaultValue: 'Basic'
  },
  bonuses: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  activity_level: {
    type: DataTypes.STRING,
    allowNull: true
  },
  referral_code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('user', 'courier', 'admin'), // роли пользователей
    defaultValue: 'user'
  },
  subscription_status: { // Статус подписки пользователя
    type: DataTypes.STRING,
    allowNull: true
  },
  subscription_start_date: { // Дата начала подписки
    type: DataTypes.DATE,
    allowNull: true
  },
  subscription_end_date: { // Дата окончания подписки
    type: DataTypes.DATE,
    allowNull: true
  },
  full_address: { // Полный адрес пользователя
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'User' // указание имени таблицы
});

module.exports = User;
