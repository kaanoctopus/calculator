class CalculationController {
  constructor(calculationService) {
    this.calculationService = calculationService;
    this.calculate = this.calculate.bind(this);
  }

  calculate(req, res) {
    const { expression } = req.body;
    try {
      const result = this.calculationService.evaluateExpression(expression);
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = CalculationController;
