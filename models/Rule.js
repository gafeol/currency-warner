const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    origCurr: {
        type: String,
        required: true
    },
    destCurr : {
        type: String,
        required: true
    },
    thresholdValue: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Rule = mongoose.model('Rule', RuleSchema);

module.exports = Rule;