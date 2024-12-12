const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Meal = require("./Meal");
const Ingredient = require("./Ingredient");

const MealIngredient = sequelize.define(
  "MealIngredient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Meal,
        key: "id",
      },
      allowNull: false,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
        key: "id",
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "MealIngredients",
  }
);

// Ассоциации для "многие ко многому"
Meal.belongsToMany(Ingredient, {
  through: MealIngredient,
  foreignKey: "meal_id",
});
Ingredient.belongsToMany(Meal, {
  through: MealIngredient,
  foreignKey: "ingredient_id",
});

// Ассоциации для использования с `include`
MealIngredient.belongsTo(Ingredient, { foreignKey: "ingredient_id" });
Ingredient.hasMany(MealIngredient, { foreignKey: "ingredient_id" });

module.exports = MealIngredient;
