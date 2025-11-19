const express = require('express');
const router = express.Router();
const {productController} = require('./controllers/productController');
const { protect, requireRole } = require('./middleware/authMiddleware');
const { upload } = require('./config/cloudinary');

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected (farmer)
router.post(
    '/', 
    protect, 
    requireRole('farmer'),
    upload.single('image'),
    productController.createProduct);
router.put('/:id', protect, requireRole('farmer'), updateProduct);
router.delete('/:id', protect, requireRole('farmer'), deleteProduct);

module.exports = router;
