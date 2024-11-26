// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Goal = require('./Goal'); // Импорт модели цели
const User = require('./User'); // Импорт модели пользователя

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  goal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Goal,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Goal, { foreignKey: 'goal_id' });

module.exports = Cart;