const mongoose = require('mongoose');

const screeningRuleSchema = new mongoose.Schema({
    class: { type: String, required: true },
    active: { type: Boolean, default: true },
    criteria: {}
});

const ScreeningRule = mongoose.model('ScreeningRule', screeningRuleSchema);

module.exports = ScreeningRule;