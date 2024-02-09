const { Router } = require('express');
const eventController = require('../controllers/eventController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();


router.get('/get/events', eventController.getEvents);
router.post('/event/create', eventController.createEvent);
router.get('/event/get/:id', eventController.getEvent);
router.put('/event/update/:id', eventController.updateEvent);
router.delete('/event/delete/:id', eventController.deleteEvent);


module.exports = router;
