const express = require('express');
const mysql = require('mysql2');
const db = require('../db');
const router = express.Router();

const convertType = (type) => {
    switch (type) {
        case 'int': return 'INT';
        case 'string': return 'VARCHAR(255)';
        case 'email': return 'VARCHAR(255)';
        case 'date': return 'DATE';
        default: return 'VARCHAR(255)';
    }
};

router.post('/entities', (req, res) => {
    const { entityName, attributes } = req.body;

    if (!entityName || typeof entityName !== 'string' || !attributes || !Array.isArray(attributes)) {
        return res.status(400).send('Invalid input format');
    }

    // Check if the table already exists
    db.query(`SHOW TABLES LIKE ?`, [entityName], (err, results) => {
        if (err) {
            console.error('Error checking for table existence:', err);
            return res.status(500).json({ error: 'Error checking for table existence' });
        }

        if (results.length > 0) {
            // Table exists, check for missing columns and then insert data
            ensureColumnsExist(entityName, attributes, res);
        } else {
            // Table does not exist, create the table first
            createAndInsertTable(entityName, attributes, res);
        }
    });
});
function createAndInsertTable(entityName, attributes, res) {
    // Create table SQL
    let createTableSql = `CREATE TABLE ?? (id INT AUTO_INCREMENT PRIMARY KEY, `;
    createTableSql += attributes.map(attr => `${mysql.escapeId(attr.name)} ${convertType(attr.type)}`).join(', ');
    createTableSql += `)`;

    db.query(createTableSql, [entityName], (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return res.status(500).send('Error creating table');
        }

        // Table created, now insert data
        insertDataIntoTable(entityName, attributes, res);
    });
}


function ensureColumnsExist(entityName, attributes, res) {
    // Get the existing columns of the table
    db.query(`SHOW COLUMNS FROM ??`, [entityName], (err, existingColumns) => {
        if (err) {
            console.error('Error fetching columns:', err);
            return res.status(500).send('Error fetching columns');
        }

        let existingColumnNames = existingColumns.map(column => column.Field);
        let columnsToAdd = attributes.filter(attr => !existingColumnNames.includes(attr.name));

        if (columnsToAdd.length > 0) {
            // There are new columns to add
            let addColumnsQueries = columnsToAdd.map(attr => {
                return `ALTER TABLE ?? ADD COLUMN ?? ${convertType(attr.type)}`;
            });

            // Execute all ALTER TABLE queries
            executeAlterQueries(addColumnsQueries, 0, entityName, attributes, res);
        } else {
            // No new columns to add, proceed with inserting data
            insertDataIntoTable(entityName, attributes, res);
        }
    });
}

function executeAlterQueries(queries, index, entityName, attributes, res) {
    if (index >= queries.length) {
        // All ALTER TABLE queries executed, now insert data
        insertDataIntoTable(entityName, attributes, res);
        return;
    }

    db.query(queries[index], [entityName, attributes[index].name], (err) => {
        if (err) {
            console.error('Error altering table:', err);
            return res.status(500).send('Error altering table');
        }

        // Proceed to the next ALTER TABLE query
        executeAlterQueries(queries, index + 1, entityName, attributes, res);
    });
}

function insertDataIntoTable(entityName, attributes, res) {
    let insertSql = `INSERT INTO ?? (${attributes.map(attr => mysql.escapeId(attr.name)).join(', ')}) VALUES `;
    let values = attributes.map(attr => mysql.escape(attr.value));
    insertSql += `(${values.join(', ')});`;

    db.query(insertSql, [entityName], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        res.json({ message: `Data inserted successfully into table ${entityName}.` });
    });
}

module.exports = router;
