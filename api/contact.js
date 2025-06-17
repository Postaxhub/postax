const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact:', err);
      res.status(500).json({ message: 'Error saving contact.' });
    } else {
      res.status(200).json({ message: 'Contact saved successfully!' });
    }
  });
});

module.exports = router;
