const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const calculationRoutes = require('../../routes/CalculationRoutes');

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

app.use('/api/', calculationRoutes);

module.exports.handler = serverless(app);
