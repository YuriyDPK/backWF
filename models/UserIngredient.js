// models/UserIngredient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // подключение к базе данных

const UserIngredient = sequelize.define('UserIngredient', {
  id: { // Уникальный идентификатор связи пользователя и ингредиента
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
  ingredient_id: { // Идентификатор ингредиента
    type: DataTypes.INTEGER,
    references: {
      model: 'Ingredients',
      key: 'id'
    },
    allowNull: false
  },
  is_excluded: { // Флаг исключения ингредиента из рациона
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'user_ingredients' // указание имени таблицы
});

module.exports = UserIngredient;
