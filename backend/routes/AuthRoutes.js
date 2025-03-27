const express = require("express");
const AuthService = require("../services/AuthService");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.put("/me", authMiddleware, authController.updateProfile);
router.delete("/me", authMiddleware, authController.deleteAccount);
router.post("/logout", authController.logout);

module.exports = router;
