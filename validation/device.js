const Validator = require("validator");
const isEmptyObject = require("../helpers").isEmptyObject;

module.exports = data => {
  errors = {};

  if (!Validator.isIP(data.ip, 4)) {
    errors.ip = "IP is not valid";
  }

  if (!Validator.isLength(data.name, { min: 1, max: 50 })) {
    errors.name = "Name should be between 1 and 50 characters";
  }

  return {
    errors,
    isValid: isEmptyObject(errors)
  };
};
