const asyncHandler = require('../middleware/asyncHandler');
const Farmer = require('../models/farmer');
const User = require('../models/user');

// Get current farmer profile (protected)
exports.getMyProfile = asyncHandler(async (req, res) => {
  // req.user is populated by authMiddleware
  const farmer = await Farmer.findOne({ user: req.user._id }).populate('user', 'name email phone');
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer profile not found');
  }
  res.json(farmer);
});

// Update farmer profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findOne({ user: req.user._id });
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer profile not found');
  }
  const { farmName, farmLocation, farmSize, farmType, bio, profileImageUrl } = req.body;
  farmer.farmName = farmName || farmer.farmName;
  farmer.farmLocation = farmLocation || farmer.farmLocation;
  farmer.farmSize = farmSize || farmer.farmSize;
  farmer.farmType = farmType || farmer.farmType;
  farmer.bio = bio || farmer.bio;
  farmer.profileImageUrl = profileImageUrl || farmer.profileImageUrl;
  await farmer.save();
  res.json(farmer);
});

// Public: get farmer by id
exports.getFarmerById = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.params.id).populate('user', 'name email');
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found');
  }
  res.json(farmer);
});
