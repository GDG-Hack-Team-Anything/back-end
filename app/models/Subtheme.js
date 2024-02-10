const mongoose = require('mongoose');

const subthemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    criteria: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Criteria'
    }],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
}, {
    timestamps: true
});

const Subtheme = mongoose.model('Subtheme', subthemeSchema);

module.exports = Subtheme;
