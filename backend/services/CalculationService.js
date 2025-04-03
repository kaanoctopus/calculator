const math = require("mathjs");
const Calculation = require("../models/Calculation");
const User = require("../models/User");

class CalculationService {
  async evaluateExpression(expression, userId) {
    try {
      const result = math.evaluate(expression).toString();
      
      this.saveCalculationAsync(userId, expression, result)
        .catch(err => console.error('Background save error:', err));
      
      return { result };
    } catch (error) {
      throw new Error("Invalid Expression");
    }
  }
  
  async saveCalculationAsync(userId, expression, result) {
    const calculation = new Calculation({ userId, expression, result });
    await calculation.save();
    
    await User.findByIdAndUpdate(userId, {
      $push: { history: calculation._id },
    }).lean();
  }

  async getHistory(userId) {
    return Calculation.find({ userId }).sort({ createdAt: -1 });
  }

  async clearHistory(userId) {
    await Calculation.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { history: [] });
  }
}

module.exports = CalculationService;
