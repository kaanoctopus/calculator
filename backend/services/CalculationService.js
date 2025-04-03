const math = require("mathjs");
const Calculation = require("../models/Calculation");
const User = require("../models/User");

const BACKUP_API_BASE = "https://calcbackend.netlify.app/api";
const PRIMARY_API_BASE =
    "https://6hkhcefyhrrnzjd3siqho25hte0lngbi.lambda-url.eu-north-1.on.aws/api";

class CalculationService {
    async evaluateExpression(expression, userId) {
        try {
            const result = math.evaluate(expression).toString();

            this.saveCalculationWithFailover(userId, expression, result).catch(
                (err) => console.error("All save attempts failed:", err)
            );

            return { result };
        } catch (error) {
            throw new Error("Invalid Expression");
        }
    }

    async saveCalculation(userId, expression, result) {
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

    async saveCalculationWithFailover(userId, expression, result) {
        try {
            await this.saveToAPI(PRIMARY_API_BASE, userId, expression, result);
        } catch (primaryError) {
            console.warn(
                "Primary API save failed, trying backup...",
                primaryError
            );

            try {
                await this.saveToAPI(
                    BACKUP_API_BASE,
                    userId,
                    expression,
                    result
                );
            } catch (backupError) {
                throw new Error(`Both APIs failed: ${backupError.message}`);
            }
        }
    }

    async saveToAPI(apiBase, userId, expression, result) {
        const response = await fetch(`${apiBase}/save-calculation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                expression,
                result,
            }),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}

module.exports = CalculationService;
