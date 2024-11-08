// app.js
const express = require("express");
const sequelize = require("./db");
const User = require('./models/User'); // импорт модели User
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Подключение к базе данных и синхронизация
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
    
    // Синхронизация модели с базой данных
    await sequelize.sync({ force: false }); // Используйте { force: true }, чтобы пересоздать таблицы
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initDatabase();

// Подключение маршрутов
app.use('/api/auth', authRoutes);
// Тестовый маршрут
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is working!' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
