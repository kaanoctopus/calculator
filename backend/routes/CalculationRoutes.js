const express = require('express');
const CalculationService = require('../services/CalculationService');
const CalculationController = require('../controllers/CalculationController');

const router = express.Router();

router.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
  });
  

const calculationService = new CalculationService();
const calculationController = new CalculationController(calculationService);

router.post('/calculate', calculationController.calculate);

module.exports = router;
