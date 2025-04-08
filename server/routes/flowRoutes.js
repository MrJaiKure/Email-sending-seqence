const express = require('express');
const { saveFlow, scheduleEmail } = require('../controllers/flowController');

const router = express.Router();

router.post('/save-flow', saveFlow);
router.post('/schedule-email', scheduleEmail);

module.exports = router;
