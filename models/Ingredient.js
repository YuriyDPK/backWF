// models/Ingredient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к базе данных
const Dish = require('./Dish'); // Импорт модели Dish

const Ingredient = sequelize.define('Ingredient', {
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Dish, // Связь с таблицей Dish
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false, // Калорийность обязательно
  },
  protein: {
    type: DataTypes.FLOAT, // Белки (граммы)
    allowNull: false,
    defaultValue: 0, // По умолчанию 0
  },
  fats: {
    type: DataTypes.FLOAT, // Жиры (граммы)
    allowNull: false,
    defaultValue: 0, // По умолчанию 0
  },
  carbs: {
    type: DataTypes.FLOAT, // Углеводы (граммы)
    allowNull: false,
    defaultValue: 0, // По умолчанию 0
  },
  weight: {
    type: DataTypes.INTEGER, // Вес ингредиента в граммах
    allowNull: false,
  },
}, {
  tableName: 'Ingredient' // указание имени таблицы
});

// Связь: Ingredient -> Dish
Ingredient.belongsTo(Dish, { foreignKey: 'dish_id', as: 'Dish' });
Dish.hasMany(Ingredient, { foreignKey: 'dish_id', as: 'Ingredient' });

module.exports = Ingredient;
