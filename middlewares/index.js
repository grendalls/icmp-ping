const isEmptyObject = require("../helpers").isEmptyObject;

const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      isAuthenticated: false
    });
  }
};

const isRequestBodyEmpty = (req, res, next) => {
  const errors = {};
  if (isEmptyObject(req.body)) {
    errors.message = "Request body is empty";
    res.status(400).json(errors);
  } else {
    next();
  }
};

module.exports = {
  authenticationMiddleware,
  isRequestBodyEmpty
};
