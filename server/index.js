const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Read = require('./routes/Read-entity');
const Create=require('./routes/Create-entity');
const Delete=require('./routes/Delete-entry');
const Update=require('./routes/Update-entity');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

app.use("/api",Create);
app.use("/api",Read);
app.use("/api",Delete);
app.use("/api",Update);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
