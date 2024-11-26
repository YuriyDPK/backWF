// models/MealPlan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const Goal = require('./Goal'); // Импорт модели Goal для связи

const MealPlan = sequelize.define('MealPlan', {
  goal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Goal,
      key: 'id',
    },
  },
  duration_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_per_day: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bonus_points: {
    type: DataTypes.INTEGER,
  },
  discount_percentage: {
    type: DataTypes.INTEGER,
  },
});

// Связь: MealPlan -> Goal
MealPlan.belongsTo(Goal, { foreignKey: 'goal_id', as: 'goal' });
Goal.hasMany(MealPlan, { foreignKey: 'goal_id', as: 'mealPlans' });

module.exports = MealPlan;
