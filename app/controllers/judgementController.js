const Judgement = require('../models/Judgement');
const Team = require('../models/Team');
const User = require('../models/User');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback');
const Event = require('../models/Event');
const Notification = require('../models/Notification');
const Criteria = require('../models/Criteria');

// get all criteria by subtheme of an event
exports.getCriteriaBySubtheme = async (req, res) => {
    try {
        const criteria = await Criteria.find({ subtheme: req.params.subthemeId });
        res.status(200).json(criteria);
        console.log("criteria fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

// get one criteria by id
exports.getCriteria = async (req, res) => {
    try {
        const criteria = await Criteria.findById(req.params.id);
        res.status(200).json(criteria);
        console.log("criteria fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

// create a new criteria

exports.createCriteria = async (req, res) => {
    try {
        const criteria = await Criteria.create({ ...req.body });
        console.log("Criteria created successfully");
        if (req.body.subtheme) {
            const subtheme = await Subtheme.findById(req.body.subtheme);
            if (subtheme) {
                subtheme.criteria.push(criteria._id);
                await subtheme.save();
            }
        }
        res.status(200).json(criteria);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update a criteria
exports.updateCriteria = async (req, res) => {
    try {
        const criteria = await Criteria.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log("Criteria updated successfully");
        res.status(200).json(criteria);
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//delete a criteria
exports.deleteCriteria = async (req, res) => {
    try {
        const criteria = await Criteria.findByIdAndDelete(req.params.id);
        console.log("Criteria deleted successfully");
        if (req.body.subtheme) {
            const subtheme = await Subtheme.findById(req.body.subtheme);
            if (subtheme) {
                subtheme.criteria = subtheme.criteria.filter(criterion => criterion != criteria._id);
                await subtheme.save();
            }
        }
        res.status(200).json(criteria);
    }
    catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//get all feedbacks by judgement
exports.getFeedbacksByJudgement = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ judgement: req.params.judgementId });
        res.status(200).json(feedbacks);
        console.log("feedbacks fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//get a feedback by id
exports.getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        res.status(200).json(feedback);
        console.log("feedback fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//create a new feedback
exports.createFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create({ ...req.body });
        console.log("Feedback created successfully");
        if (req.body.judgement) {
            const judgement = await Judgement.findById(req.body.judgement);
            if (judgement) {
                judgement.feedbacks.push(feedback._id);
                await judgement.save();
            }
        }
        res.status(200).json(feedback);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update a feedback
exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log("Feedback updated successfully");
        res.status(200).json(feedback);
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//delete a feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        console.log("Feedback deleted successfully");
        if (req.body.judgement) {
            const judgement = await Judgement.findById(req.body.judgement);
            if (judgement) {
                judgement.feedbacks = judgement.feedbacks.filter(feedback => feedback != feedback._id);
                await judgement.save();
            }
        }
        res.status(200).json(feedback);
    }
    catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//get all judgements
exports.getJudgements = async (req, res) => {
    try {
        const judgements = await Judgement.find();
        res.status(200).json(judgements);
        console.log("judgements fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//get a judgement by id
exports.getJudgement = async (req, res) => {
    try {
        const judgement = await Judgement.findById(req.params.id);
        res.status(200).json(judgement);
        console.log("judgement fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//create a new judgement
exports.createJudgement = async (req, res) => {
    try {
        const judgement = await Judgement.create({ ...req.body });
        console.log("Judgement created successfully");

        if (req.body.team) {
            const team = await Team.findById(req.body.team);
            if (team) {
                team.judgement = judgement._id;
                await team.save(); // Save the team after updating judgements
            }
        }
        res.status(200).json(judgement);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update a judgement

exports.updateJudgement = async (req, res) => {
    try {
        const judgement = await Judgement.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log("Judgement updated successfully");
        res.status(200).json(judgement);
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ message: err.message });
    }
}

//delete a judgement
exports.deleteJudgement = async (req, res) => {
    try {
        const judgement = await Judgement.findByIdAndDelete(req.params.id);
        console.log("Judgement deleted successfully");
        if (req.body.team) {
            const team = await Team.findById(req.body.team);
            if (team) {
                team.judgement = null;
                await team.save();
            }
        }
        res.status(200).json(judgement);
    }
    catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
}
