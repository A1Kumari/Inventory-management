// models/productModel.js

const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the product name"],
        },
        price: {
            type: Number,
            required: [true, "Please add the product price"],
            default: 0.0,
        },
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        category: {
            type: String,
            required: [true, "Please add a category"],
        },
        stock: {
            type: Number,
            required: [true, "Please add the stock quantity"],
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
