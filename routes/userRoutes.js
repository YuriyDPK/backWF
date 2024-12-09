const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Импорт модели User

const router = express.Router();

// Настройка хранения файлов с помощью multer
const storage = multer.diskStorage({
  destination: './uploads/', // Папка для сохранения файлов
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  },
});
const upload = multer({ storage });

// Регистрация или авторизация пользователя по номеру телефона
router.post('/login', async (req, res) => {
  const { phone_number } = req.body;
  console.log(phone_number);
  
  if (!phone_number) {
    return res.status(400).json({ error: 'Необходимо указать номер телефона' });
  }

  try {
    // Поиск пользователя по номеру телефона
    let user = await User.findOne({ where: { phone_number } });

    // Если пользователь не найден, создаем его
    if (!user) {
      user = await User.create({ phone_number });
    }

    // Возвращаем ID пользователя для сохранения на клиенте
    return res.status(200).json({ user_id: user.id, is_verified: user.is_verified });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение данных пользователя по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление данных пользователя (включая profile_picture)
router.put('/:id', upload.single('profile_picture'), async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Если загружается новое фото, добавляем его путь в updateData
    if (req.file) {
      updateData.profile_picture = `/uploads/${req.file.filename}`;
    }

    // Обновление данных пользователя
    await user.update(updateData);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Маршрут для загрузки фото отдельно
router.post('/upload', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, path: filePath });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка при загрузке файла' });
  }
});

module.exports = router;
