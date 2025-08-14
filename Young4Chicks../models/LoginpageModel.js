const mongoose = require("mongoose");

const loginpageSchema = new mongoose.Schema({   
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    idnumber: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    role: {
        type: String,
        required: true,
        enum: ["sales_agent", "youth_farmer", "brooder_manager"], // Example roles, adjust as necessary
    },
}, { timestamps: true });

module.exports = mongoose.model("Loginpage", loginpageSchema);

