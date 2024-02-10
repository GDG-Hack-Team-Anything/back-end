const { Router } = require('express');

const judgementController = require('../controllers/judgementController');
const { requireAuth } = require('../middleware/userMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = Router();

// feedbacks of judgement

router.get('/feedbacks/get', judgementController.getFeedbacksByJudgement);
router.post('/feedback/create', judgementController.createFeedback);
router.get('/feedback/get/:id', judgementController.getFeedback);
router.put('/feedback/update/:id', judgementController.updateFeedback);
router.delete('/feedback/delete/:id', judgementController.deleteFeedback);


router.get('/judgements/get', judgementController.getJudgements);
router.post('/judgement/create', judgementController.createJudgement);
router.get('/judgement/get/:id', judgementController.getJudgement);
router.put('/judgement/update/:id', judgementController.updateJudgement);
router.delete('/judgement/delete/:id', judgementController.deleteJudgement);

module.exports = router;