const { Router } = require('express');
const submissionController = require('../controllers/submissionController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

router.get('/fields/get', submissionController.getFields);
router.get('/field/get/:id', submissionController.getField);
router.post('/field/create', submissionController.createField);
router.put('/field/update/:id', submissionController.updateField);
router.delete('/field/delete/:id', submissionController.deleteField);

router.get('/submissions/get/:id', submissionController.getSubmissions);
router.get('/submission/get/:id', submissionController.getSubmission);
router.post('/submission/create', submissionController.createSubmission);
router.put('/submission/update/:id', submissionController.updateSubmission);
router.delete('/submission/delete/:id', submissionController.deleteSubmission);


module.exports = router;
