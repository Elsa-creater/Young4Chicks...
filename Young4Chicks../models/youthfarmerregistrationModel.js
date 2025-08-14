const mongoose = require("mongoose");

const YouthfarmerregistrationSchema = new mongoose.Schema({
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
    location: {
        type: String,
        required: true,
    },
    agegroup: {
        type: Number,
        required: true,
        min: 18,
        max: 30,
    },
    nameofbusiness: {
        type: String,
        required: true,
    },
    nin: {
        type: String,
        required: true,
        unique: true, // Ensure NIN is unique
    },
    chickRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChickRequestform",
}],
}, { timestamps: true });



module.exports = mongoose.model("Youthfarmerregistration", YouthfarmerregistrationSchema);