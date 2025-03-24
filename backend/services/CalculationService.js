const math = require('mathjs');

class CalculationService {
  evaluateExpression(expression) {
    try {
      const result = math.evaluate(expression);
      return { result };
    } catch (error) {
      throw new Error('Invalid Expression');
    }
  }
}

module.exports = CalculationService;
