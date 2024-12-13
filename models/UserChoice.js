// models/UserChoice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const Dish = require('./Dish'); // Импорт модели Dish

const UserChoice = sequelize.define('UserChoice', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Dish, // Связь с таблицей Dish
      key: 'id',
    },
  },
  removed_ingredients: {
    type: DataTypes.JSON, // JSON-формат для хранения удаленных ингредиентов
    allowNull: true,
  },
}, {
  tableName: 'UserChoice' // указание имени таблицы
});

// Связь: UserChoice -> Dish
UserChoice.belongsTo(Dish, { foreignKey: 'dish_id', as: 'Dish' });
Dish.hasMany(UserChoice, { foreignKey: 'dish_id', as: 'UserChoice' });

module.exports = UserChoice;
