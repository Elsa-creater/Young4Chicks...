// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const SalesagentSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true,
//     },
//     phonenumber: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // Ensure email is unique
//     },
//     nin: {
//         type: String,
//         required: true,
//         unique: true, // Ensure NIN is unique}
//     },
//     assignedarea: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6, // Minimum password length
//     },

// }, { timestamps: true });

// SalesagentSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });


// // Check password
// SalesagentSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const Salesagentregistration = mongoose.model('Salesagentregistration', SalesagentSchema);
// module.exports = Salesagentregistration;