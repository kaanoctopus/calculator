const { body } = require("express-validator");

const registerValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

const updateProfileValidation = [
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty"),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty")
];

const forgotPasswordValidation = [
  body("email").trim().isEmail().withMessage("Valid email is required")
];

const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  forgotPasswordValidation,
  resetPasswordValidation
};
