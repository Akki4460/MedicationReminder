const express = require('express');
const { getFilteredAcknowledgmentLogs } = require('../controllers/admin/logsFilterController');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkAdminRole = require('../middlewares/roleCheckMiddleware');

const router = express.Router();

router.get('/acknowledgment-logs', authenticateJWT, checkAdminRole, getFilteredAcknowledgmentLogs);

module.exports = router;
