const Skull = require('../models/skull/skull')

async function skull(req, res, next) {

    // const access = Skull.findOne({
    //     key: req.query.key
    // }, 'access').then(r => res.json(r));

    const access = true;
    
    if (access) next()
    else res.status(500).send()
}

module.exports = skull;