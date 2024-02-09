const mongoose = require('mongoose');

const judgementSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    criteria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Criteria'
    },
    score: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});


const Judgement = mongoose.model('Judgement', judgementSchema);

module.exports = Judgement;

