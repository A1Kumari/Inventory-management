const express = require("express");
const router = express.Router();
const {
  getInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryControllers");
const protect = require("../middleware/authMiddleware");

// Define routes
router.route("/")
  .get(protect, getInventory)         // Protected route: Get all inventory items
  .post(protect, createInventoryItem) // Protected route: Create a new inventory item

router.route("/:id")
  .get(protect, getInventoryItem)     // Protected route: Get a single inventory item by ID
  .put(protect, updateInventoryItem)  // Protected route: Update a single inventory item by ID
  .delete(protect, deleteInventoryItem); // Protected route: Delete a single inventory item by ID

module.exports = router;
