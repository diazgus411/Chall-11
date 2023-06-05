const express = require('express');
const router = express();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

router.post('/data', (req, res) => {
  const data = req.body;
  // Process the data
  res.json({ success: true, message: 'Data received successfully.' });
});

module.exports = router;