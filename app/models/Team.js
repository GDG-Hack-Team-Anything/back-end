const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    },
    judgement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Judgement'
    },
}, {
    timestamps: true
});


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
