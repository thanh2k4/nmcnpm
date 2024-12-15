const Product = require('../models/Product');
const ProductUpdateRequest = require('../dto/request/ProductUpdateRequest');


// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get a product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        return res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Update a product by id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productData = new ProductUpdateRequest(req.body);
        await product.update(productData);
        return res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createProduct, getProducts, getProductById, deleteProduct, updateProduct };