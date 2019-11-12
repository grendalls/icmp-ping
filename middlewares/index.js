const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      isAuthenticated: false
    });
  }
};

module.exports = authenticationMiddleware;
