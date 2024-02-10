const { Router } = require('express');
const teamController = require('../controllers/teamController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

router.get('/teams/get', teamController.getTeams);
router.get('/team/get/:id', teamController.getTeam);
router.post('/team/create', teamController.createTeam);
router.put('/team/update/:id', teamController.updateTeam);
router.delete('/team/delete/:id', teamController.deleteTeam);

module.exports = router;

