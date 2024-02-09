const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();


router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


router.get('/user/testUser', requireAuth ,(req, res) => {
    res.json({message: 'test done'});
});

module.exports = router;