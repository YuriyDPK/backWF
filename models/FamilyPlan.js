// models/FamilyPlan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const User = require('./User');
const Goal = require('./Goal');

const FamilyPlan = sequelize.define('FamilyPlan', {
  id: { // Уникальный идентификатор семейного плана
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя, создавшего семейный план
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  relationship: { // Отношение к дополнительному члену семьи
    type: DataTypes.STRING,
    allowNull: false
  },
  additional_member_name: { // Имя дополнительного члена семьи
    type: DataTypes.STRING,
    allowNull: false
  },
  shared_goal_id: { // Идентификатор цели, связанной с планом
    type: DataTypes.INTEGER,
    references: {
      model: Goal,
      key: 'id'
    },
    allowNull: true
  },
  discount_applied: { // Примененная скидка на семейный план
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'FamilyPlan' // указание имени таблицы
});

module.exports = FamilyPlan;
