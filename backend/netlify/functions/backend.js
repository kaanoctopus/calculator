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

app.use(express.json());

app.options("*", cors());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/", calculationRoutes);
app.use("/api/", authRoutes);

module.exports.handler = serverless(app);
