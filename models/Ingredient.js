// models/Ingredient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ingredient = sequelize.define("Ingredient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  calories: {
    type: DataTypes.FLOAT,
  },
  is_allergen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Ingredient;
