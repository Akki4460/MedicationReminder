const checkAdminRole = (req, res, next) => {
    // Ensure the user role exists and is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  };
  
  module.exports = checkAdminRole;
  