const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        // required: true,
    },
    endDate: {
        type: Date,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },
    detailledDescription: {
        type: String,
        // required: true,
    },
    state:{
        type: String,
        enum: ["planned", "running", "finished"],
    },
    theme: {
        type: String,
        // required: true,
    },
    subthemes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
        }
    ],
    judges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    mentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    submissionForm: {
        fields: [{
            type: String,
            // required: true,
        }],
        isOpen: {
            type: Boolean,
        }
    },
    submissions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    agenda:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    discordServer:
        {
            type: String,
            // required: true,
        },
    problemChannel:
        {
            type: String,
            // required: true,
        },
    mentorsChannel:
        {
            type: String,
            // required: true,
        },
    }, {
    timestamps: true
    });


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
