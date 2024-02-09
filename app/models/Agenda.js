const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
}, {
    timestamps: true
});


const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;