const asyncHandler = require('express-async-handler');
const Inventory = require('../models/inventoryModel');

const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
});

const getInventoryItem = asyncHandler(async (req, res) => {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
        res.status(404);
        throw new Error('Inventory item not found');
    }
    res.status(200).json(inventoryItem);
});

const createInventoryItem = asyncHandler(async (req, res) => {
    const { productName, quantity, price, description, category } = req.body;
    const newInventoryItem = await Inventory.create({
        productName,
        quantity,
        price,
        description,
        category,
    });
    res.status(201).json(newInventoryItem);
});

const updateInventoryItem = asyncHandler(async (req, res) => {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
        res.status(404);
        throw new Error('Inventory item not found');
    }
    inventoryItem.productName = req.body.productName || inventoryItem.productName;
    inventoryItem.quantity = req.body.quantity || inventoryItem.quantity;
    inventoryItem.price = req.body.price || inventoryItem.price;
    inventoryItem.description = req.body.description || inventoryItem.description;
    inventoryItem.category = req.body.category || inventoryItem.category;
    inventoryItem.updatedAt = Date.now();
    const updatedInventoryItem = await inventoryItem.save();
    res.status(200).json(updatedInventoryItem);
});

const deleteInventoryItem = asyncHandler(async (req, res) => {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
        res.status(404);
        throw new Error('Inventory item not found');
    }
    await inventoryItem.remove();
    res.status(200).json({ message: 'Inventory item removed' });
});

module.exports = {
    getInventory,
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};
