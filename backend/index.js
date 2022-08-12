require('dotenv').config();
const { BACKEND_PORT } = process.env;

const express = require('express');
const bodyParser = require('body-parser');

require('./database');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(BACKEND_PORT, () => {
    console.log(`App listening on port: ${ BACKEND_PORT }`)
});