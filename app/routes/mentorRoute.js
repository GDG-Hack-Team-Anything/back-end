const { Router } = require('express');
const mentorController = require('../controllers/mentorController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');
const app = require('../../server');


const router = Router();

router.get('/mentors/get', mentorController.getMentors);
router.post('/mentor/create', mentorController.createMentor);
router.get('/mentor/get/:id', mentorController.getMentor);
router.put('/mentor/update/:id', mentorController.updateMentor);
router.delete('/mentor/delete/:id', mentorController.deleteMentor);


module.exports = router;