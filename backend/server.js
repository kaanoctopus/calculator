const express = require('express');
const cors = require('cors');
const calculationRoutes = require('./routes/calculationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', calculationRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
