// utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      // Include other user properties as needed
    },
  };

  return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.secret);
    return decoded;
  } catch (error) {
    return null;
  }
};
