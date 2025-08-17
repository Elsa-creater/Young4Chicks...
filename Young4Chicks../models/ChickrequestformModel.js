const mongoose = require('mongoose');

chickrequestformSchema = new mongoose.Schema({
   fullname: {
         type: String,
         required: true,
    },
    email: {
            type: String,
            required: true,
            unique: true // Ensure email is unique
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
            enum: ['layer', 'broiler', 'exotic'] // Example of chick types
    },
    typeoffarmer: {
            type: String,
            required: true,
            enum: ['small', 'medium', 'large'] // Example of farmer types
    },
    quantity: {
            type: Number,
            required: true,
            min: 100, // Ensure quantity is at least 1
            max: 500,
    },
    dateoforder: {
            type: Date,
            required: true,
            default: Date.now // Default to current date
    },
    preferreddeliverydate: {
            type: Date,
            required: true,
    },
    additionalnotes: {
            type: String,
            required: false, // Optional field
    },
}, { timestamps: true });
module.exports = mongoose.model('Chickrequestform', chickrequestformSchema);