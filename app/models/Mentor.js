const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    discordID: {
        type: String,
        default: null,
    },
    field: {
        type: String,
        default: null,
    },
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    }, {timestamps: true});


const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;

