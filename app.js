// app.js
const express = require("express");
const sequelize = require("./db");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

// Синхронизация базы данных
sequelize.sync().then(() => {
  console.log("Database synchronized");
});

// Маршрут для создания заказа
app.post("/orders", async (req, res) => {
  try {
    const { item, quantity, price } = req.body;
    const order = await Order.create({ item, quantity, price });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Маршрут для получения всех заказов
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
