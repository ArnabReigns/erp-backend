const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./src/middleware/skull'))
app.use('/api', require('./src/middleware/apikey'))
app.use('/api', require('./src/routes'));

app.get('/', (req, res) => {
    res.send('Api routes are available in /api/. You will be needing a api key to access that route. please contact Arnab Chatterjee for api key.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
