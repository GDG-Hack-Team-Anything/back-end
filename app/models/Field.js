const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
}, {
    timestamps: true
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;

