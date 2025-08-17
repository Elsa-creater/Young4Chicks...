const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    phonenumber: {
        type: String,
        required: true,
    },
    agegroup: {
        type: String,
        required: true,
        min: 18,
        max: 30,
    },
    nin: {
        type: String,
        required: true,
        unique: true, // Ensure NIN is unique}
    },
    nameofbusiness: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    assignedarea: {
        type: String,
        required: true,
    }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);