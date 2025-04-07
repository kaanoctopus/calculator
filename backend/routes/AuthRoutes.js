const express = require("express");
const { body } = require("express-validator");
const AuthService = require("../services/AuthService");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.use(helmet());
router.use(cors());


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2, 
  message: "Too many requests from this IP, please try again later"
});

router.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.sendStatus(204);
});

router.post("/register", [
    authLimiter,
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character")
], authController.register);

router.post("/login", [
  authLimiter,
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
], authController.login);

router.get("/me", authMiddleware, authController.getMe);
router.put("/me", authMiddleware, [
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty"),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty")
], authController.updateProfile);

router.delete("/me", authMiddleware, authController.deleteAccount);

router.post("/logout", authMiddleware, authController.logout);

router.post("/forgot-password", [
  authLimiter,
  body("email").trim().isEmail().withMessage("Valid email is required")
], authController.forgotPassword);

router.post("/reset-password", [
  authLimiter,
  body("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character")
], authController.resetPassword);

module.exports = router;