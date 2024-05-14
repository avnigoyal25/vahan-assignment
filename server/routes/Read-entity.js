const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/read-entity', (req, res) => {
  const { entityName } = req.body;

  if (!entityName) {
    return res.status(400).json({ error: 'Entity name is required' });
  }
  
  const query = `SELECT * FROM ??`;
  db.query(query, [entityName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }

    res.json(results);
  });
});

module.exports = router;
