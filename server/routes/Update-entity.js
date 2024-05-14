const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/update-entity', (req, res) => {
  const { entityName, attributeName, attributeValue, attributes } = req.body;

  if (!entityName || !attributeName || !attributeValue || attributes.length === 0) {
    return res.status(400).json({ error: 'Entity name, identifying attribute, its value, and new attributes are required' });
  }

  const updates = attributes.map(attr => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
      db.query(query, [entityName, attr.name, attr.value, attributeName, attributeValue], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });

  Promise.all(updates)
    .then(() => res.json({ message: 'Entity updated successfully' }))
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
    });
});

module.exports = router;
