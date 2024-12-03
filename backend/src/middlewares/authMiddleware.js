const jwt = require('jsonwebtoken');
const { User } = require('../models/User');  

const authenticateJWT = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer token"
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Attach userInfo to the request
    req.user = decoded;  //{id,role}
    next(); 
  });
};

module.exports = authenticateJWT;
