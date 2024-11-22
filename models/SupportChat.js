// models/SupportChat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const SupportChat = sequelize.define('SupportChat', {
  id: { // Уникальный идентификатор сообщения в чате поддержки
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
  support_agent_id: { // Идентификатор агента поддержки
    type: DataTypes.INTEGER,
    references: {
      model: 'SupportAgents',
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
  tableName: 'support_chats' // указание имени таблицы
});

module.exports = SupportChat;
