// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// const express = require("express");
// const serverless = require("serverless-http");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const calculationRoutes = require("routes/CalculationRoutes");
// const authRoutes = require("routes/AuthRoutes");

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.options("*", cors());

// mongoose
//     .connect(process.env.MONGO_URI, {})
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error("MongoDB connection error:", err));

// app.use("/api/", calculationRoutes);
// app.use("/api/auth", authRoutes);

// module.exports.handler = serverless(app);

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const calculationRoutes = require("routes/CalculationRoutes");
const authRoutes = require("routes/AuthRoutes");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.options("*", cors());

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Prisma connected to the database");
    } catch (error) {
        console.error("Prisma connection error:", error);
    }
}

testConnection();

app.use("/api/", calculationRoutes);
app.use("/api/auth", authRoutes);

module.exports.handler = serverless(app);

