
const Field = require('../models/Field');
const Event = require('../models/Event');
const Submission = require('../models/Submission');
const Team = require('../models/Team');
const User = require('../models/User');

const { checkGitHubRepositoryAccessibility, checkFigmaFileAccessibility } = require('../utils/validateURL');



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

// create a new submission


exports.createSubmission = async (req, res) => {
    try {
        const { eventId, teamId, fields } = req.body;

        // Retrieve all field IDs
        const fieldIds = fields.map(field => field.fieldId);

        // Retrieve names of all fields asynchronously
        const fieldNames = await Promise.all(fieldIds.map(async (fieldId) => {
            const field = await Field.findById(fieldId);
            return field.name;
        }));

        // Find the index of the GitHub and Figma fields
        const githubIndex = fieldNames.indexOf('github');
        const figmaIndex = fieldNames.indexOf('figma');

        // Check if both GitHub and Figma fields are present
        if (githubIndex !== -1 && figmaIndex !== -1) {
            // Extract GitHub and Figma URLs
            const githubUrl = fields.find((field, index) => index === githubIndex).value;
            const figmaUrl = fields.find((field, index) => index === figmaIndex).value;


        if (githubUrl) {
        try {
            isGithubPublic = await checkGitHubRepositoryAccessibility(githubUrl.value);
        } catch (error) {
            console.error(`Error checking GitHub repository accessibility for URL: ${githubUrl.value}`, error);
            return res.status(500).json({ message: `Error checking GitHub repository accessibility for URL: ${githubUrl.value}` });
        }
    }


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

            // Update event or team if needed

            res.status(201).json(submission);
        } else {
            // Either GitHub or Figma field is missing
            res.status(400).json({ message: 'Both GitHub and Figma fields are required' });
        }
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.updateSubmission = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { fields } = req.body;

        // Filter GitHub and Figma URLs
        const githubUrls = fields.filter(field => field.name === 'github' && field.type === 'url').map(field => field.value);
        const figmaUrls = fields.filter(field => field.name === 'figma' && field.type === 'url').map(field => field.value);

        // Validate GitHub and Figma URLs
        const githubResults = await Promise.all(githubUrls.map(url => checkGitHubRepositoryAccessibility(url)));
        const figmaResults = await Promise.all(figmaUrls.map(url => checkFigmaFileAccessibility(url)));

        // Check if any URL is invalid or private
        if (githubResults.includes(false) || figmaResults.includes(false)) {
            return res.status(400).json({ message: 'One or more URLs are invalid or private' });
        }

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









