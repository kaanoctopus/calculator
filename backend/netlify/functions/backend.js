const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const calculationRoutes = require('../../routes/CalculationRoutes');

const app = express();


app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  )
app.use(express.json());
app.use('/api/', calculationRoutes);

module.exports.handler = serverless(app);
