const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ============================
// Youth Farmer Schema
// ============================
const YouthfarmerSchema = new mongoose.Schema({
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

YouthfarmerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

YouthfarmerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Youthfarmer = mongoose.model("Youthfarmer", YouthfarmerSchema);

// ============================
// Sales Agent Schema
// ============================
const SalesagentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nin: { type: String, required: true, unique: true },
  assignedarea: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

SalesagentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

SalesagentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Salesagent = mongoose.model("Salesagent", SalesagentSchema);

// ============================
// Brooder Manager Schema
// ============================
const BroodermanagerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nin: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

BroodermanagerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

BroodermanagerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Broodermanager = mongoose.model("Broodermanager", BroodermanagerSchema);

// ============================
// Export all models
// ============================
module.exports = {
  Youthfarmer,
  Salesagent,
  Broodermanager
};