const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let features = [];

app.get('/api/features', (req, res) => {
  res.json(features);
});

app.post('/api/features', (req, res) => {
  const { feature } = req.body;
  features.push(feature);
  res.json(feature);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
