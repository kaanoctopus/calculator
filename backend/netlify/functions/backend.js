const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const calculationRoutes = require('../../routes/CalculationRoutes');

const app = express();


app.use(cors());
app.use(express.json());

app.options("*", cors());

app.use('/api/', calculationRoutes);

module.exports.handler = serverless(app);
