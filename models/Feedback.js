// models/Feedback.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const Feedback = sequelize.define('Feedback', {
  id: { // Уникальный идентификатор отзыва
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя, оставившего отзыв
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  },
  comment: { // Текст отзыва
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: { // URL изображения для отзыва (если есть)
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: { // Время создания отзыва
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'feedback' // указание имени таблицы
});

module.exports = Feedback;
