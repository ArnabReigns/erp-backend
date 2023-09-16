const express = require('express');
const logger = require('../../models/logger/logger');
const router = express.Router();

router.get('/', async (req, res) => {

    logger.find({}).then(r => {
        res.send(r)
    }).catch(err => res.json(err))
})

router.delete('/', async (req, res) => {

    logger.deleteMany({}).then(r => {
        res.send(r)
    }).catch(err => res.json(err))
})


module.exports = router