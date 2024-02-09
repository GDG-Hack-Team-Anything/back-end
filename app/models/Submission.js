const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    fields: [{
        field: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Field'
        },
        value: {
            type: String,
            required: true
        }
    }],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
}, {
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;