const { Router } = require('express');
const userController = require('../controllers/UserController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

router.post('/create/admin', userController.createAdmin);
router.post('/create/judge', userController.createJudge);
router.post('/create/participant', userController.createParticipant);
router.post('/create/company', userController.createCompany);

router.get('/get/admins', userController.getAdmins);
router.get('/get/judges', userController.getJudges);
router.get('/get/participants', userController.getParticipants);
router.get('/get/companys', userController.getCompanies);

router.get('/get/allUsers', userController.getAllUsers);
router.get('/get/eventUsers', userController.getEventUsers);

router.post('/user/create', userController.createUser);
router.get('/user/get/:id', userController.getUser);
router.put('/user/update/:id', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);



router.get('/user/testUser', requireAuth ,(req, res) => {
    res.json({message: 'test done'});
}); 

module.exports = router;


