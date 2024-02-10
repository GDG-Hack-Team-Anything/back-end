const { Router } = require('express');
const subthemeController = require('../controllers/subthemeController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();


router.get('/subthemes/get/:id', subthemeController.getSubthemes);
router.post('/subtheme/create', subthemeController.createSubtheme);
router.get('/subtheme/get/:id', subthemeController.getSubtheme);
router.put('/subtheme/update/:id', subthemeController.updateSubtheme);
router.delete('/subtheme/delete/:id', subthemeController.deleteSubtheme);


module.exports = router;

// Path: app/routes/themeRoute.js   