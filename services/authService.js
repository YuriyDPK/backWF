// services/authService.js
const User = require('../models/User');

exports.findOrCreateUser = async (phone_number) => {
  let user = await User.findOne({ where: { phone_number } });

  if (!user) {
    user = await User.create({ phone_number });
  }

  return user;
};
