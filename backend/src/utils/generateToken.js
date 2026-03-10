const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'grb_super_secret_key_12345', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
