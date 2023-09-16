const mongoose = require('mongoose');

const ActiitySchema = new mongoose.Schema({
    user: {},
    activity: String,
    date: Date,
    ip: String
});


module.exports = mongoose.model('Actiity', ActiitySchema);