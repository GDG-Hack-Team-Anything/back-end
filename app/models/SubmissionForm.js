const mongoose = require('mongoose');

const submissionFormSchema = new mongoose.Schema({
    fields: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field'
    }],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});


const SubmissionForm = mongoose.model('SubmissionForm', submissionFormSchema);

module.exports = SubmissionForm;