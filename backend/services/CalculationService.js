const math = require("mathjs");
const Calculation = require("../models/Calculation");
const User = require("../models/User");

class CalculationService {
    async evaluateExpression(expression, userId) {
        try {
            const result = math.evaluate(expression).toString();

            this.saveCalculationAsync(userId, expression, result).catch((err) =>
                console.error("Background save error:", err)
            );

            return { result };
        } catch (error) {
            throw new Error("Invalid Expression");
        }
    }

    async saveCalculationAsync(userId, expression, result) {
        try {
            const calculation = new Calculation({ userId, expression, result });
            await calculation.save();

            await User.findByIdAndUpdate(userId, {
                $push: { history: calculation._id },
            }).lean();
        } catch (err) {
            console.error("Primary save failed. Trying secondary API...", err);

            try {
                const response = await fetch(
                    "https://calcbackend.netlify.app/api/calculate",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYWxjdWxhdGlvbi1zZXJ2aWNlIiwic3ViIjoiaW50ZXJuYWwiLCJyb2xlIjoic2VydmljZSIsImlhdCI6MTc0MzY4NTEzOSwiZXhwIjoxNzc1MjIxMTM5fQ.2abXZR3Qsi30YZXPbfKBL6mZsBtd-qxm78m7jdnGjGU",
                        },
                        body: JSON.stringify({ userId, expression, result }),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Backup API responded with status: ${response.status}`
                    );
                }

                console.log("Successfully saved to secondary API.");
            } catch (backupErr) {
                console.error("Backup API save failed:", backupErr);
            }
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
