const Subtheme = require('../models/Subtheme');
const Event = require('../models/Event');
const Criteria = require('../models/Criteria');

//create subtheme

exports.createSubtheme = async (req, res) => {
    try {
        const subtheme = await Subtheme.create({ ...req.body });
        console.log("Subtheme created successfully");
        if (req.body.event) {
            const event = await Event.findById(req.body.event);
            if (event) {
                event.subthemes.push(subtheme._id);
                await event.save();
            }
        }
        res.status(200).json(subtheme);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//get subtheme by id
exports.getSubtheme = async (req, res) => {
    try {
        const subtheme = await Subtheme.findById(req.params.id);
        res.status(200).json(subtheme);
        console.log("subtheme fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//get all subthemes of event by event id

exports.getSubthemes = async (req, res) => {
    try {
        const subthemes = await Subtheme.find({ event: req.params.id });
        res.status(200).json(subthemes);
        console.log("subthemes fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

// Update a subtheme

exports.updateSubtheme = async (req, res) => {
    try {
        const subtheme = await Subtheme.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log("subtheme updated successfully");
        res.status(200).json(subtheme);
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//delete a subtheme

exports.deleteSubtheme = async (req, res) => {
    try {
        const subtheme = await Subtheme.findByIdAndDelete(req.params.id);
        console.log("subtheme deleted successfully");
        if (subtheme.event) {
            const event = await Event.findById(subtheme.event);
            if (event) {
                event.subthemes = event.subthemes.filter(sub => sub != subtheme._id);
                await event.save();
            }
        }
        res.status(200).json(subtheme);
    } catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
}



