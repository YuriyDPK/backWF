// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/login',
  body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
  authController.login
);

module.exports = router;
