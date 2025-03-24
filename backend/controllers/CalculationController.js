class CalculationController {
    constructor(calculationService) {
      this.calculationService = calculationService;
      this.calculate = this.calculate.bind(this);
    }
  
    calculate(req, res) {
      const { expression } = req.body;
      try {
        const result = this.calculationService.evaluateExpression(expression);
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  }
  
  module.exports = CalculationController;
  