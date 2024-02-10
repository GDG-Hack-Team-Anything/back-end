const Event = require('../models/Event');


// Create and Save a new Event

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body });
        res.status(200).json(event);
        console.log("event created sucessfully");
    } catch (err) {
        console.log("Creation failed");
        res.status(500).json({ message: err.message });
    }
}


// Retrieve and return all events from the database.

exports.getEvents = (req, res) => {
    Event.find()
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving events.'
            });
        });
};

// Find a single event with an id

exports.getEvent = (req, res) => {
    const id = req.params.id;

    Event.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: 'Not found Event with id ' + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: 'Error retrieving Event with id=' + id });
        });
};

// Update an event by the id in the request

exports.updateEvent = (req, res) => {
    const id = req.params.id;

    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found!`
                });
            } else res.send({ message: 'Event was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Event with id=' + id
            });
        });
}


// Delete an event with the specified id in the request

exports.deleteEvent = (req, res) => {
    _id = req.params.id;
    try{
        const event = Event.findByIdAndDelete(_id);
        if(event){
            res.status(200).json({message: "Event deleted successfully"});
            console.log("Event deleted successfully");
        }else{
            res.status(404).json({message: "Event not found"});
            console.log("Event not found");
        }
    }
    catch(err){
        console.log("Event delete failed");
        res.status(500).json({message: err.message});
    }

}   




