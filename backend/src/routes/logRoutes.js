const express = require('express');
const { logAcknowledgment, getAcknowledgmentLogsByUser, getAcknowledgmentLogsByMedicine } = require('../controllers/logController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to log acknowledgment (user takes medicine)
router.post('/',authenticateJWT ,logAcknowledgment);

// Route to get all acknowledgment logs by user
router.get('/user/:user_id', getAcknowledgmentLogsByUser);

// Route to get all acknowledgment logs by medicine
router.get('/medicine/:medicine_id', getAcknowledgmentLogsByMedicine);

module.exports = router;
