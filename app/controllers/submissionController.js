
const Field = require('../models/Field');
const Event = require('../models/Event');
const Submission = require('../models/Submission');
const Team = require('../models/Team');
const User = require('../models/User');



//get all fields
exports.getFields = async (req, res) => {
    try {
        const fields = await Field.find();
        res.status(200).json(fields);
        console.log("fields fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//get a field by id
exports.getField = async (req, res) => {
    try {
        const field = await Field.findById(req.params.id);
        res.status(200).json(field);
        console.log("field fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//create a new field
exports.createField = async (req, res) => {
    try {
        const field = await Field.create({ ...req.body });
        console.log("Field created successfully");

        if (req.body.event) {
            const event = await Event.findById(req.body.event);
            if (event) {
                event.submissionForm.fields.push(field._id);
                await event.save(); // Save the submission form after updating fields
            }
        }

        res.status(200).json(field);
    } catch (err) {
        console.error("Creation failed:", err);
        res.status(500).json({ message: err.message });
    }
};



// Update a field
exports.updateField = async (req, res) => {
    try {
        const field = await Field.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json(field);
        console.log("Field updated successfully");
    } catch (err) {
        console.log("Update failed");
        res.status(500).json({ message: err.message });
    }
};


exports.deleteField = async (req, res) => {
    try {
        const field = await Field.findByIdAndDelete(req.params.id);
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }

        console.log("Field deleted successfully");
        res.status(200).json({ message: "Field deleted successfully" });
    } catch (err) {
        console.error("Deletion failed:", err);
        res.status(500).json({ message: err.message });
    }
};




// get all sumbissions of the event by event id

exports.getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ event: req.params.id });
        res.status(200).json(submissions);
        console.log("submissions fetched sucessfully");
    } catch (err) {
        console.error("Fetching failed:", err);
        res.status(500).json({ message: "Failed to fetch submissions" });
    }
};

//get a submission by id

exports.getSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        res.status(200).json(submission);
        console.log("submission fetched sucessfully");
    } catch (err) {
        console.log("Fetching failed");
        res.status(500).json({ message: err.message });
    }
}

//create a new submission

exports.createSubmission = async (req, res) => {
    try {
        const { eventId, teamId, fields } = req.body;

        // Validate input data if necessary

        // Create a new submission document
        const submission = new Submission({
            event: eventId,
            team: teamId,
            fields: fields.map(field => ({
                field: field.fieldId,
                value: field.value
            }))
        });

        // Save the submission to the database
        await submission.save();

        const event = await Event.findById(eventId);
        if (event) {
            event.submissions.push(submission._id);
            await event.save();
        }

        const team = await Team.findById(teamId);
        if (team) {
            team.submission = submission._id;
            await team.save();
        }

        console.log("Submission created successfully");

        res.status(201).json(submission);
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//update a submission

exports.updateSubmission = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { fields } = req.body;

        // Find the submission by ID
        let submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        // Update the fields of the submission
        submission.fields = fields.map(field => ({
            field: field.fieldId,
            value: field.value
        }));

        // Save the updated submission to the database
        await submission.save();

        res.status(200).json(submission);
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//delete a submission

exports.deleteSubmission = async (req, res) => {
    try {
        // Find the submission by ID and delete it
        const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);

        if (!deletedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission deleted successfully', deletedSubmission });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};









