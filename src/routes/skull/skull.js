const express = require('express');
const router = express.Router();
const Skull = require('../../models/skull/skull');


router.get('/', (req, res) => {
    Skull.findOne({
        key: req.query.key
    }, 'access').then(r => res.json(r));
})

router.put('/set', (req, res) => {
    Skull.updateOne({
        key: req.body.key
    }, {
        access: req.body.access
    }).then(r => res.json({
        status : req.body.access == "true" ? "Provided site access back ✅" : "Site access terminated chief 💀" 
    })).catch(err => res.json({
        err
    }))
})

module.exports = router;