const express = require('express');
const Logger = require('../../utils/logger');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.headers['x-forwarded-for'] || req.socket.remoteAddress );
    Logger(req, 'hehe');
    res.send('ok')
})


module.exports = router