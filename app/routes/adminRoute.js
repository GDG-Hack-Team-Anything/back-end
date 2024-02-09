const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

module.exports = router;