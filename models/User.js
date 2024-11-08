// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const User = sequelize.define('User', {
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
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
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
  bonus_balance: {
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
  full_address: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users' // указание имени таблицы
});

module.exports = User;
