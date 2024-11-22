// models/DeliverySchedule.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const DeliverySchedule = sequelize.define('DeliverySchedule', {
  id: { // Уникальный идентификатор графика доставки
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
  delivery_date: { // Дата доставки
    type: DataTypes.DATE,
    allowNull: false
  },
  total_protein: { // Общее количество белков в рационе
    type: DataTypes.FLOAT,
    allowNull: true
  },
  total_fat: { // Общее количество жиров в рационе
    type: DataTypes.FLOAT,
    allowNull: true
  },
  total_carbs: { // Общее количество углеводов в рационе
    type: DataTypes.FLOAT,
    allowNull: true
  },
  total_kkal: { // Общая калорийность рациона
    type: DataTypes.INTEGER,
    allowNull: true
  },
  address_id: { // Идентификатор адреса доставки
    type: DataTypes.INTEGER,
    references: {
      model: 'Addresses',
      key: 'id'
    },
    allowNull: false
  },
  delivery_interval: { // Интервал времени доставки
    type: DataTypes.STRING,
    allowNull: true
  },
  comments: { // Комментарии к доставке
    type: DataTypes.TEXT,
    allowNull: true
  },
  promo_code: { // Промокод на скидку
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'delivery_schedules' // указание имени таблицы
});

module.exports = DeliverySchedule;
