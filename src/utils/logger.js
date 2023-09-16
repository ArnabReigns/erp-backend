const logger = require('../models/logger/logger')

const Logger = (req,log) => {
    new logger({
        activity: log,
        user: req.user,
        ip: req.socket.remoteAddress,
        date: new Date()
    }).save().then(res => {
        console.log("Logged : " + log)
    }).catch(err => console.log(err));
}

module.exports = Logger;