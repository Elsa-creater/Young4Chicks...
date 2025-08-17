const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ============================
// Youth Farmer Schema
// ============================
const YouthFarmerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  location: { type: String, required: true },
  agegroup: { type: Number, required: true, min: 18, max: 30 },
  nameofbusiness: { type: String, required: true },
  nin: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  chickRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChickRequestform" }],
}, { timestamps: true });

YouthFarmerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

YouthFarmerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const YouthFarmer = mongoose.model("YouthFarmer", YouthFarmerSchema);

// ============================
// Sales Agent Schema
// ============================
const SalesAgentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nin: { type: String, required: true, unique: true },
  assignedarea: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

SalesAgentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

SalesAgentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const SalesAgent = mongoose.model("SalesAgent", SalesAgentSchema);

// ============================
// Brooder Manager Schema
// ============================
const BrooderManagerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nin: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

BrooderManagerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

BrooderManagerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const BrooderManager = mongoose.model("BrooderManager", BrooderManagerSchema);

// ============================
// Export all models
// ============================
module.exports = {
  YouthFarmer,
  SalesAgent,
  BrooderManager
};