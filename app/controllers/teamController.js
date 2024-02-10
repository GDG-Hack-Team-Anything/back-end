const Team = require('../models/Team');
const User = require('../models/User');
const Event = require('../models/Event');




exports.createTeam = async (req, res) => {
    try {
        const team = await Team.create({ ...req.body });
        console.log("Team created successfully");

        // Update event if provided in the request body
        if (req.body.event) {
            const event = await Event.findById(req.body.event);
            if (event) {
                // Ensure event.teams array is initialized
                event.teams = event.teams || [];
                event.teams.push(team._id);
                await event.save(); // Save the event after updating teams
            }
        }

        // Update users if provided in the request body
        if (req.body.members && req.body.members.length > 0) {
            const users = await User.find({ _id: { $in: req.body.members } });
            // Loop through users and update their team
            for (const user of users) {
                user.team = team._id;
                await user.save();
            }
        }
        
        res.status(200).json(team);
    } catch (err) {
        console.error("Team creation failed:", err);
        res.status(500).json({ message: "Team creation failed" });
    }
}


exports.updateTeam = async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Team.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        console.log("Team updated successfully");
        
        res.status(200).json(team);
    } catch (err) {
        console.error("Team update failed:", err);
        res.status(500).json({ message: "Team update failed" });
    }
}





//get team by id
exports.getTeam = (req, res) => {
    const id = req.params.id;
    Team.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Team with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Team with id=" + id });
        });
};

//get all teams

exports.getTeams = (req, res) => {
    Team.find()
        .then(teams => {
            res.send(teams);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving teams."
            });
        });
};

//delete team by id

exports.deleteTeam = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the team by ID
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Remove the team ID from the members' teams array
        await User.updateMany(
            { _id: { $in: team.members } },
            { $pull: { team: id } }
        );

        // Remove the team ID from the associated event's teams array
        if (team.event) {
            const event = await Event.findById(team.event);
            if (event) {
                event.teams.pull(id);
                await event.save();
            }
        }

        // Delete the team
        await Team.findByIdAndDelete(id);

        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


