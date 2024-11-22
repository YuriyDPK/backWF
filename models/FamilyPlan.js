// models/FamilyPlan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const FamilyPlan = sequelize.define('FamilyPlan', {
  id: { // Уникальный идентификатор семейного плана
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { // Идентификатор пользователя, создавшего семейный план
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
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
      model: 'Goals',
      key: 'id'
    },
    allowNull: true
  },
  discount_applied: { // Примененная скидка на семейный план
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'family_plans' // указание имени таблицы
});

module.exports = FamilyPlan;
