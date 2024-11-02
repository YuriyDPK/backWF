// models/MenuItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

const MenuItem = sequelize.define("MenuItem", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
  },
});

MenuItem.belongsTo(Category, { foreignKey: "category_id" });

module.exports = MenuItem;
