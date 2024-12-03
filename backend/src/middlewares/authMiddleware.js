const { verifyToken } = require('../utils/JWT');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attaching userInfo to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
