const express = require("express");
const AuthService = require("../services/AuthService");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const cors = require("cors");

const {
  securityHeaders,
  authLimiter,
  loginLimiter,
  passwordResetLimiter,
  sanitizeInput
} = require("../middlewares/AuthSecurityMiddleware");

const {
  validate,
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} = require("../middlewares/AuthValidationMiddleware");

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.use(securityHeaders);
router.use(cors());
router.use(sanitizeInput);

router.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.sendStatus(204);
});

router.post("/register", [authLimiter, ...registerValidation, validate], authController.register);
router.post("/login", [loginLimiter, ...loginValidation, validate], authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.put("/me", [authMiddleware, ...profileUpdateValidation, validate], authController.updateProfile);
router.delete("/me", authMiddleware, authController.deleteAccount);
router.post("/logout", authMiddleware, authController.logout);
router.post("/forgot-password", [passwordResetLimiter, ...forgotPasswordValidation, validate], authController.forgotPassword);
router.post("/reset-password", [passwordResetLimiter, ...resetPasswordValidation, validate], authController.resetPassword);

module.exports = router;