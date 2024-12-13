// models/SupportChat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const User = require('./User');
const SupportAgent = require('./SupportAgent');

const SupportChat = sequelize.define('SupportChat', {
  id: { // Уникальный идентификатор сообщения в чате поддержки
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
  support_agent_id: { // Идентификатор агента поддержки
    type: DataTypes.INTEGER,
    references: {
      model: SupportAgent,
      key: 'id'
    },
    allowNull: false
  },
  message: { // Текст сообщения
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: { // Время отправки сообщения
    type: DataTypes.DATE,
    allowNull: false
  },
  is_from_user: { // Флаг, указывающий, отправлено ли сообщение пользователем
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'SupportChat' // указание имени таблицы
});

module.exports = SupportChat;
