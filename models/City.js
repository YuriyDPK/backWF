// models/City.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const City = sequelize.define("City", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delivery_price: {
    type: DataTypes.FLOAT,
  },
});

module.exports = City;
