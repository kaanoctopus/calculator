const express = require("express");
const CalculationService = require("../services/CalculationService");
const CalculationController = require("../controllers/CalculationController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

const calculationService = new CalculationService();
const calculationController = new CalculationController(calculationService);

router.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
});

router.post("/calculate", authMiddleware, calculationController.calculate);
router.get("/history", authMiddleware, calculationController.getHistory);
router.delete("/history", authMiddleware, calculationController.clearHistory);

module.exports = router;
