const mongoose = require("mongoose");

const CalculationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expression: String,
    result: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Calculation", CalculationSchema);
