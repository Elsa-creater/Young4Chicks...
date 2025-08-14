const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

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
    deliverylocation: {
        type: String,
        required: true,
    },
    chicktype: {
        type: String,
        required: true,
        enum: ["Layers", "Broilers", "Local"], // Example types, adjust as necessary
    },
    typeoffarmer: {
        type: String,
        required: true,
        enum: ["New Farmer", "Returning Farmer"], // Example types, adjust as necessary
    },
    quantity: {
        type: Number,
        required: true,
    },
    nin: {
        type: String,
        required: true,
        unique: true, // Ensure NIN is unique
    },
    agegroup: {
        type: Number,
        required: true,
        min: 18,
        max: 30, // Assuming age group is between 18 and 30
    },
    nameofbusiness: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    dateoforder: {
        type: Date,
        default: Date.now, // Automatically set to current date if not provided
    },
    preferreddeliverydate: {
        type: Date,
        required: true, 
    },
    additionalnotes: {
        type: String,
        default: "",
    },
}, { timestamps: true });
UserSchema.plugin(passportLocalMongoose,{
  usernameField: 'phonenumber'
})
module.exports = mongoose.model("User", UserSchema);
