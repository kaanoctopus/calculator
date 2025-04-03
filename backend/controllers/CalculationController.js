class CalculationController {
  constructor(calculationService) {
    this.calculationService = calculationService;
    
    this.calculate = this.calculate.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.saveCalculation = this.saveCalculation.bind(this);
  }

  async calculate(req, res) {
    const { expression } = req.body;
    const userId = req.userId;

    try {
      const result = await this.calculationService.evaluateExpression(
        expression,
        userId
      );
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getHistory(req, res) {
    const userId = req.userId;
    try {
      const history = await this.calculationService.getHistory(userId);
      res.json({ history });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async saveCalculation(req, res) {
    const userId = req.userId;
    const expression = req.expression;
    const result = req.result;
    try {
      await this.calculationService.saveCalculation(userId, expression, result);
      res.json({ message: "Calculation saved" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async clearHistory(req, res) {
    const userId = req.userId;
    try {
      await this.calculationService.clearHistory(userId);
      res.json({ message: "History cleared" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = CalculationController;
