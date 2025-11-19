const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile, getFarmerById } = require('./controllers/farmerController');
const { protect, requireRole } = require('./middleware/authMiddleware');

// protected farmer routes
router.get('/me', protect, requireRole('farmer'), getMyProfile);
router.put('/me', protect, requireRole('farmer'), updateProfile);

// public
router.get('/:id', getFarmerById);

module.exports = router;
