// controllers/authController.js
const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phone_number } = req.body;

  try {
    const user = await authService.findOrCreateUser(phone_number);

    if (!user) {
      return res.status(500).json({ message: 'Error during login process' });
    }

    const token = generateToken(user.id);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
