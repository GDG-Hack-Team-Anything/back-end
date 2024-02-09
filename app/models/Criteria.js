const mongoose = require('mongoose');

const criteriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    subtheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtheme'
    },
}, {
    timestamps: true
});


const Criteria = mongoose.model('Criteria', criteriaSchema);

module.exports = Criteria;
