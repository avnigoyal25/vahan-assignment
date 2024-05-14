const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/delete-entity', (req, res) => {
  const { entityName, attribute, entryName } = req.body;

  if (!entityName || !attribute || !entryName) {
    return res.status(400).json({ error: 'Entity name, attribute, and entry name are required' });
  }

  const query = `DELETE FROM ?? WHERE ?? = ?`;
  db.query(query, [entityName, attribute, entryName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'No matching entry found to delete' });
    }

    res.json({ message: 'Entry deleted successfully' });
  });
});

module.exports = router;
