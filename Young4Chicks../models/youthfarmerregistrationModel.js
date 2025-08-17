const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const YouthFarmerSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    chickRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChickRequestform",
}],
    

}, { timestamps: true });

YouthFarmerSchema.pre('save', async function (next) {
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
  YouthFarmerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  // Step 4: Create model
const YouthFarmer = mongoose.model("YouthFarmer", YouthFarmerSchema);

// Step 5: Export model
module.exports = YouthFarmer;
//   module.exports = mongoose.model('Youthfarmerregistration', YouthfarmerSchema);
// // module.exports = mongoose.model('Youthfarmerregistration', YouthfarmerSchema);
// const Youthfarmerregistration = mongoose.models.Youthfarmerregistration || mongoose.model('Youthfarmerregistration', YouthfarmerSchema);
// module.exports = Youthfarmerregistration;