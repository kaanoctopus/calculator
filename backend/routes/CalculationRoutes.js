const express = require('express');
const CalculationService = require('../services/CalculationService');
const CalculationController = require('../controllers/CalculationController');

const router = express.Router();
const calculationService = new CalculationService();
const calculationController = new CalculationController(calculationService);

router.post('/calculate', calculationController.calculate);

module.exports = router;
