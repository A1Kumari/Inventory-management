const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routers/userRoute");
const inventoryRoute = require("./routers/inventoryRoutes"); // Add this line
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/inventory", inventoryRoute); // Add this line

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//connect to mongodb and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
