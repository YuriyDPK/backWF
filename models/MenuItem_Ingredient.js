// models/MenuItem_Ingredient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const MenuItem = require("./MenuItem");
const Ingredient = require("./Ingredient");

const MenuItem_Ingredient = sequelize.define("MenuItem_Ingredient", {
  quantity: {
    type: DataTypes.FLOAT,
  },
});

MenuItem.belongsToMany(Ingredient, { through: MenuItem_Ingredient });
Ingredient.belongsToMany(MenuItem, { through: MenuItem_Ingredient });

module.exports = MenuItem_Ingredient;
