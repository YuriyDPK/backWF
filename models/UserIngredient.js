// models/UserIngredient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных
const User = require('./User');
const Ingredient = require('./Ingredient');
const UserIngredient = sequelize.define('UserIngredient', {
  id: { // Уникальный идентификатор связи пользователя и ингредиента
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
  ingredient_id: { // Идентификатор ингредиента
    type: DataTypes.INTEGER,
    references: {
      model: Ingredient,
      key: 'id'
    },
    allowNull: false
  },
  is_excluded: { // Флаг исключения ингредиента из рациона
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'UserIngredient' // указание имени таблицы
});

module.exports = UserIngredient;
