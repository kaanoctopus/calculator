const express = require("express");
const AuthService = require("../services/AuthService");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

router.post("/register", authController.register);
router.post("/login", authMiddleware, authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.put("/me", authMiddleware, authController.updateProfile);
router.delete("/me", authMiddleware, authController.deleteAccount);
router.post("/logout", authController.logout);

module.exports = router;
