const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BroodermanagerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    nin: {
        type: String,
        required: true,
        unique: true // Ensure NIN is unique
    },
    phonenumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },

})
 BroodermanagerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
     try {
         const salt = await bcrypt.genSalt(10); // Generate salt
         this.password = await bcrypt.hash(this.password, salt); // 10 is salt rounds
     next();
     } catch (error) {
         next(error);
     } 
   });
   
   // Method to check password during login
   BroodermanagerSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
   };

   const Broodermanager = mongoose.model("Broodermanager", BroodermanagerSchema);
   module.exports = Broodermanager;