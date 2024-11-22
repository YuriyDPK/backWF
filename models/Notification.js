// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Notification = sequelize.define('Notification', {
  id: { // Уникальный идентификатор уведомления
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя, которому предназначено уведомление
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  },
  title: { // Заголовок уведомления
    type: DataTypes.STRING,
    allowNull: false
  },
  message: { // Текст уведомления
    type: DataTypes.TEXT,
    allowNull: false
  },
  notification_date: { // Дата отправки уведомления
    type: DataTypes.DATE,
    allowNull: false
  },
  is_read: { // Статус прочтения уведомления
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'notifications' // указание имени таблицы
});

module.exports = Notification;
