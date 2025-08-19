const express = require("express");
const router = express.Router();
const {Youthfarmer, Salesagent, Broodermanager} = require("../models/UserModel"); // Assuming a unified User model for all roles


// Render Login Page
// =====================
router.get('/loginpage', (req, res) => {
    res.render('loginpage');
});

// handle login post
router.post('/loginpage', async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const emailClean = email.trim().toLowerCase();

    console.log("Login form data:", req.body);
// fetch user from the databse
    let user;

    if (role === 'youth_farmer') {
      user = await Youthfarmer.findOne({ email: emailClean });
    } else if (role === 'sales_agent') {
      user = await Salesagent.findOne({ email: emailClean });
    } else if (role === 'brooder_manager') {
      user = await Broodermanager.findOne({ email: emailClean});
    } else {
      return res.status(400).send('Invalid role.');
    }
    
    if (!user) return res.status(400).send('User not found');
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).send('Incorrect password');
    
    req.session.userId = user._id;
    req.session.role = role;
    
    // Redirect to dashboard
    if (role === 'youth_farmer') return res.redirect(`/youthfarmer/${user._id}/dashboard`);
    if (role === 'sales_agent') return res.redirect(`/salesagent/${user._id}/dashboard`);
    if (role === 'brooder_manager') return res.redirect(`/broodermanager/${user._id}/dashboard`);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error: " + err.message);
  }

});

function protectRoute(req, res, next) {
  if (!req.session.userId) {
    // User is not logged in, redirect to login page
    return res.redirect('/loginpage');
  }
  next();
}
// Middleware to protect routes

module.exports = router;