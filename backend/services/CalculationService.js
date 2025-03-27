const math = require("mathjs");
const Calculation = require("../models/Calculation");
const User = require("../models/User");

class CalculationService {
  async evaluateExpression(expression, userId) {
    try {
      const result = math.evaluate(expression).toString();
      const calculation = new Calculation({ userId, expression, result });
      await calculation.save();

      await User.findByIdAndUpdate(userId, {
        $push: { history: calculation._id },
      });
      return { result };
    } catch (error) {
      throw new Error("Invalid Expression");
    }
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
