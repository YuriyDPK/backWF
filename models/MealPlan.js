const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const Goal = require('./Goal'); // Импорт модели Goal
const User = require('./User'); // Импорт модели User

const MealPlan = sequelize.define('MealPlan', {
  goal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Goal,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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
}, {
  tableName: 'MealPlan',
  indexes: [
    {
      unique: true,
      fields: ['goal_id', 'user_id'], // Составной уникальный индекс
    },
  ],
});

// Связь: MealPlan -> Goal
MealPlan.belongsTo(Goal, { foreignKey: 'goal_id', as: 'Goal' });
Goal.hasMany(MealPlan, { foreignKey: 'goal_id', as: 'MealPlan' });

// Связь: MealPlan -> User
MealPlan.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
User.hasMany(MealPlan, { foreignKey: 'user_id', as: 'MealPlan' });

module.exports = MealPlan;
