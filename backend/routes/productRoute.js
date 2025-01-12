// routers/productRoute.js

const express = require("express");
const { protect } = require("../middleWare/authMiddleware");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").post(protect, createProduct).get(getProducts);
router.route("/:id").get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
