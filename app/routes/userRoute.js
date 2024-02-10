const { Router } = require('express');
const userController = require('../controllers/UserController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

router.post('/create/admin', userController.createAdmin);
router.post('/create/judge', userController.createJudge);
router.post('/create/participant', userController.createParticipant);
router.post('/create/company', userController.createCompany);

router.get('/admins/get', userController.getAdmins);
router.get('/judges/get', userController.getJudges);
router.get('/participants/get', userController.getParticipants);
router.get('/companys/get', userController.getCompanies);

router.get('/users/get', userController.getAllUsers);
router.get('/eventUsers/get', userController.getEventUsers);

router.post('/user/create', userController.createUser);
router.get('/user/get/:id', userController.getUser);
router.put('/user/update/:id', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);



router.get('/user/testUser', requireAuth ,(req, res) => {
    res.json({message: 'test done'});
}); 

module.exports = router;


