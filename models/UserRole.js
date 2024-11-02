// models/UserRole.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserRole = sequelize.define("UserRole", {
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserRole;
