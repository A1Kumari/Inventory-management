const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please fill in all required fields" });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: "Password must be at least 6 characters" });
        return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: "Email has already been registered" });
        return;
    }

    // Create new user without hashing the password
    const user = await User.create({
        name,
        email,
        password, // Storing plain password directly
    });

    if (user) {
        const { _id, name, email } = user;
        res.status(201).json({
            _id,
            name,
            email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
});


// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Debugging: Log email and password received
    console.log("Received Email:", email);
    console.log("Received Password:", password);

    if (!email || !password) {
        console.log("Validation Failed: Email or Password is missing");
        return res.status(400).json({ message: "Please add email and password" });
    }

    const user = await User.findOne({ email });

    // Debugging: Log whether the email was found
    if (!user) {
        console.log("User not found for Email:", email);
        return res.status(400).json({ message: "User not found, please sign up" });
    } else {
        console.log("User found for Email:", email);
    }

    // Debugging: Log the hashed password from the database
    console.log("Hashed Password in DB:", user.password);

    // Compare the hashed password with the one provided by the user
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    console.log(passwordIsCorrect);
    // Debugging: Log the result of the password comparison
    if (passwordIsCorrect) {
        console.log("Password comparison successful. Password matches.");
    } else {
        console.log("Password comparison failed. Incorrect password.");
    }

    if (user && passwordIsCorrect) {
        console.log("Login successful for Email:", email);

        const token = generateToken(user._id);
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: isProduction,
        });

        const { _id, name, email, photo, phone, bio } = user;
        return res.status(200).json({
            _id,
            name,
            email,
            token,
        });
    } else {
        console.log("Unexpected issue for Email:", email);
        return res.status(400).json({ message: "Invalid email or password" });
    }
});



// Logout User
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully logged out" });
});


// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (error) {
        return res.json(false);
    }
});


module.exports = {
    registerUser,
    loginUser,
    logout,
    loginStatus,
};
