const { body } = require("express-validator");

const validateCalculation = [
  body("expression")
    .trim()
    .notEmpty().withMessage("Expression is required")
    .isString().withMessage("Expression must be a string")
    .matches(/^[0-9+\-*/().\s]+$/).withMessage("Expression contains invalid characters"),
];

module.exports = {
  validateCalculation,
};
