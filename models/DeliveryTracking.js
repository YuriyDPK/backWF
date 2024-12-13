// models/DeliveryTracking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const Courier = require('./Courier');
const DeliverySchedule = require('./DeliverySchedule');

const DeliveryTracking = sequelize.define('DeliveryTracking', {
  id: { // Уникальный идентификатор отслеживания доставки
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_schedule_id: { // Идентификатор графика доставки
    type: DataTypes.INTEGER,
    references: {
      model: DeliverySchedule,
      key: 'id'
    },
    allowNull: false
  },
  courier_id: { // Идентификатор курьера
    type: DataTypes.INTEGER,
    references: {
      model: Courier,
      key: 'id'
    },
    allowNull: false
  },
  current_location_lat: { // Текущая широта местоположения курьера
    type: DataTypes.FLOAT,
    allowNull: true
  },
  current_location_long: { // Текущая долгота местоположения курьера
    type: DataTypes.FLOAT,
    allowNull: true
  },
  estimated_arrival_time: { // Оценочное время прибытия
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'DeliveryTracking' // указание имени таблицы
});

module.exports = DeliveryTracking;
