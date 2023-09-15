const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const logger = require('./src/utils/logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// skull
app.use('/skull', require('./src/routes/skull/skull'))
app.use(require('./src/middleware/skull'))


app.use('/api', require('./src/middleware/apikey'))
app.use('/api', require('./src/routes'));

app.get('/', (req, res) => {
    res.send('Api routes are available in /api/. You will be needing a api key to access that route. please contact Arnab Chatterjee for api key.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log({server_status: 'active'});
});
