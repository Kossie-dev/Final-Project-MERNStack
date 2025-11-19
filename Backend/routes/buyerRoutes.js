const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('./controllers/buyerController');
const { protect, requireRole } = require('./middleware/authMiddleware');

router.get('/me', protect, requireRole('buyer'), getMyProfile);
router.put('/me', protect, requireRole('buyer'), updateProfile);

module.exports = router;
