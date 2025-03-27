const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");

const calculationRoutes = require("../../routes/CalculationRoutes");
const authRoutes = require("../../routes/AuthRoutes");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Important: End the response for preflight
  }

  next();
});
app.use(express.json());

app.options("*", cors());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/", calculationRoutes);
app.use("/api/auth", authRoutes);

module.exports.handler = serverless(app);
