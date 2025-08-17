const express = require("express");
const router = express.Router();

// Import models
const YouthFarmer = require("../models/YouthfarmerregistrationModel");
const Salesagent = require("../models/SalesagentregistrationModel");
const BrooderManager = require("../models/BroodermanagerregistrationModel");

// =====================
// Render Login Page
// =====================
router.get('/loginpage', (req, res) => {
    res.render('loginpage');
});

router.get("/viewrequests/:id", async (req, res) => {
  const farmer = await YouthFarmer.findById(req.params.id).populate("chickRequests");
  res.render("viewRequests", { requests: farmer.chickRequests, fullname: farmer.fullname });
});
router.get('/farmerdashboard/:id', async (req, res) => {
  const farmer = await YouthFarmer.findById(req.params.id);
  res.render('farmer_dashboard', { fullname: farmer.fullname });
});
router.get('/loginpage', (req, res) => {
  const successMessage = req.query.success ? "Registration successful! Please login." : null;
  res.render('loginpage', { successMessage });
});
// =====================
// Handle Login Submission
// =====================
router.post('/loginpage', async (req, res) => {
  try {
    const { role, username, idnumber, password } = req.body;
    let user;

    // Find user based on role
    if (role === 'youth_farmer') {
      user = await YouthFarmer.findOne({ email: username, nin: idnumber});
    } else if (role === 'sales_agent') {
      user = await Salesagent.findOne({ email: username, nin: idnumber });
    } else if (role === 'brooder_manager') {
      user = await BrooderManager.findOne({ email: username, nin: idnumber });
    } else {
      return res.status(400).send('Invalid role selected.');
    }

    // If user not found
    if (!user) {
      return res.status(400).send('User not found. Please register first.');
    }

    
    // Redirect to dashboard based on role
    if (role === 'youth_farmer') {
      return res.redirect(`/viewrequests/${user._id}`);
    } else if (role === 'sales_agent') {
      return res.redirect(`/salesagentdashboard/${user._id}`);
    } else if (role === 'brooder_manager') {
      return res.redirect(`/broodermanagerdashboard/${user._id}`);
    }
    if (!user) return res.status(400).send('User not found. Please register first.');

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send('Incorrect password.');
      // Save user info in session
    req.session.userId = user._id;
    req.session.role = role;

    // Redirect to unified dashboard
    res.redirect('/dashboard')
    }
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
