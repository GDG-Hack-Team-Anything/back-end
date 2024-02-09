const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    agenda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenda'
    },
}, {
    timestamps: true
});