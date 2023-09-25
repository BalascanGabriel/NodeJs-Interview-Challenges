// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/user');
const config = require('../config');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  // Implement login logic here
};

exports.refreshToken = async (req, res) => {
  // Implement token refresh logic here
};
