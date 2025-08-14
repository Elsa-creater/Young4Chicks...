const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
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
userSchema.plugin(passportLocalMongoose,{
  usernameField: 'phonenumber'
})
module.exports = mongoose.model("User", userSchema);

const ChickStockSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    ageindays: {
        type: Number,
        required: true,
    },
    stockingdate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

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

const SalesagentSchema = new mongoose.Schema({
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
    nin: {       
        type: String,
        required: true,
        unique: true, // Ensure national ID is unique
    },
    assignedarea: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const farmerdashboardSchema = new mongoose.Schema({
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);