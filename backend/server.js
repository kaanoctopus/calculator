const express = require('express');
const cors = require('cors');
const math = require('mathjs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  try {
    const result = math.evaluate(expression);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Expression' });
  }
});

app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
