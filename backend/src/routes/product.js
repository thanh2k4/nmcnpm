const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
} = require('../controllers/ProductController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Admin
router.post('/', verifyAccessToken, authorizeRoles('ADMIN'), createProduct);
router.put('/:id', verifyAccessToken, authorizeRoles('ADMIN'), updateProduct);
router.delete('/:id', verifyAccessToken, authorizeRoles('ADMIN'), deleteProduct);

// Ko can quyen admin
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
