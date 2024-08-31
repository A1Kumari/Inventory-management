// controllers/productController.js

const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || !stock) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const product = await Product.create({
        name,
        price,
        description,
        category,
        stock,
        user: req.user._id, // associating product with the logged-in user
    });

    res.status(201).json(product);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
});

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.status(200).json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
