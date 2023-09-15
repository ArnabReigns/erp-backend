
function skull(req, res, next) {

    const access = true;

    if (access) next()
    else res.status(500).send()
}

module.exports = skull;