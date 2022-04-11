const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authToken = req.headers.token;

  if (!authToken) {
    return res.status(401).json({ message: 'Authentication token is missing!' });
  }
  const token = authToken.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid!' });
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
