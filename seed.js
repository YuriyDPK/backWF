const MealIngredient = require('./models/MealIngredient'); // Убедитесь, что путь к модели верный
const sequelize = require('./db'); // Путь к экземпляру Sequelize

async function seedMealIngredients() {
  try {
    // Синхронизируем базу данных (опционально, если таблица уже создана)
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно.');

    await MealIngredient.bulkCreate([
      { meal_id: 1, ingredient_id: 1, quantity: 100 },
    ]);

    console.log('Тестовые данные для MealIngredient успешно добавлены');
  } catch (error) {
    console.error('Ошибка при добавлении данных:', error);
  } finally {
    await sequelize.close();
  }
}

seedMealIngredients();
