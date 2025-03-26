const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const calculationRoutes = require('../../routes/CalculationRoutes');

const app = express();

const options = {
    origin: 'https://calculatoroctopus.netlify.app/',
}

app.use(cors(options));
app.use(express.json());
app.use('/api/', calculationRoutes);

module.exports.handler = serverless(app);
