// app.js
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const path = require("path"); // Импортируем path для работы с путями
// Маршруты
const userRoutes = require("./routes/userRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const mealRoutes = require("./routes/mealRoutes");
const mealIngredientRoutes = require("./routes/mealIngredientRoutes");
const goalRoutes = require('./routes/goalRoutes'); // Импорт маршрутов для целей
const dishRoutes = require('./routes/dishRoutes'); // Импорт маршрутов для Dish
const orderRoutes = require('./routes/orderRoutes'); // Импорт маршрутов для Order
const mealPlanRoutes = require('./routes/mealPlanRoutes'); // Импорт маршрутов для MealPlan
const userChoiceRoutes = require('./routes/userChoiceRoutes'); // Импорт маршрутов для UserChoice
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(express.json());
// Простая настройка CORS
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Подключение к базе данных и синхронизация
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");

    // Синхронизация модели с базой данных
    await sequelize.sync({ force: false }); // Используйте { force: true }, чтобы пересоздать таблицы
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initDatabase();

// Подключение маршрутов
app.use("/api/user", userRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/meal-ingredients", mealIngredientRoutes);
app.use('/api/goals', goalRoutes); 
app.use('/api/dishes', dishRoutes); // Подключаем маршруты
app.use('/api/orders', orderRoutes); // Подключаем маршруты
app.use('/api/meal-plans', mealPlanRoutes); // Подключаем маршруты
app.use('/api/user-choices', userChoiceRoutes); // Подключаем маршруты
app.use('/api/cart', cartRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
