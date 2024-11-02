// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const UserRole = require("./UserRole");
const City = require("./City");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.STRING,
  },
  loyalty_status: {
    type: DataTypes.STRING,
  },
});

User.belongsTo(UserRole, { foreignKey: "role_id" });
User.belongsTo(City, { foreignKey: "city_id" });

module.exports = User;
