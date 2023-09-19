require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Basically here we creating custom authorization middleware.
module.exports.authMdw = async (req, res, next) => {
  // Get the token (if it exists) from the header.
  const token = req.header('x-auth-token');

  // Check token availability.
  if (!token) {
    return res.status(401).json({ msg: 'Token not provided, authorization denied.' });
  };

  // Verify token.
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token.' });
  };
};