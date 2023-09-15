const mongoose = require('mongoose');

const skullSchema = new mongoose.Schema({
    access: Boolean,
    key: String
});


module.exports = mongoose.model('Skull', skullSchema);