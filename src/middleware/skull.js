const Skull = require('../models/skull/skull')

function skull(req, res, next) {

    Skull.findOne({}).then(r => {
        console.log(r)
        if (r.access == true) return next()
        else return res.status(500).send();
    }).catch(err => {
        res.json({
            err: "skull error"
        })
    })
}

module.exports = skull;