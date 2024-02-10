const Field = require('../models/Field');
const Event = require('../models/Event');
const Submission = require('../models/Submission');
const Team = require('../models/Team');
const User = require('../models/User');
const Mentor = require('../models/Mentor');

//get all mentors
exports.getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.status(200).json(mentors);
        console.log("mentors fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//get a mentor by id
exports.getMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        res.status(200).json(mentor);
        console.log("mentor fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//create a new mentor
exports.createMentor = async (req, res) => {
    try {
        const mentor = await Mentor.create({ ...req.body });

        if(req.body.event){
            const event = await Event.findById(req.body.event);
            if(event){
                event.mentors.push(mentor._id);
                await event.save();
            }
        }
        console.log("mentor created successfully");
        res.status(200).json(mentor);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update a mentor
exports.updateMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log("mentor updated successfully");
        res.status(200).json(mentor);
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//delete a mentor
exports.deleteMentor = async (req, res) => {
    try {
        id = req.params.id;
        const mentor = await Mentor.findByIdAndDelete(id);
        if (mentor.event) {
            const event = await Event.findById(mentor.event);
            if (event) {
                event.mentors.pull(id);
                await event.save();
            }
        }
        console.log("mentor deleted successfully");
        res.status(200).json(mentor);
    } catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
}

