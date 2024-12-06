const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
} = require('../controllers/ProductController');

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
