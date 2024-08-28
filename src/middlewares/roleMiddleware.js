const authorizeRoles = (...roles) => {
    return (req, res, next) => {
    if(!req.user){
        return res.status(403).json({ message: 'Access denied: User Not Found' });
    }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient role' });
      }
      next();
    };
  };
  
  export { authorizeRoles };
  