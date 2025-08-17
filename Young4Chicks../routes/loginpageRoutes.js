const express = require("express");
const router = express.Router();

// Import models
const {Youthfarmer, Salesagent, Broodermanager}= require("../models/UserModel"); // Assuming a unified User model for all roles


// Render Login Page
// =====================
router.get('/loginpage', (req, res) => {
    res.render('loginpage');
});


router.post('/loginpage', async (req, res) => {
  try {
    const { role, email, nin, password } = req.body;
    const emailClean = email.trim().toLowerCase();
    const ninClean = nin.trim();

    console.log("Login form data:", req.body);

    let user;

    if (role === 'youth_farmer') {
      user = await Youthfarmer.findOne({ email: emailClean, nin: ninClean });
      return res.render('youthfarmerdashboard', {
        agent: user,
        userId: user._id // Pass the user ID to the dashboard
      })
    } else if (role === 'sales_agent') {
      user = await Salesagent.findOne({ email: emailClean, nin: ninClean });
      return res.render('salesdashboard', {
        agent: user,
        userId: user._id // Pass the user ID to the dashboard
      })
    } else if (role === 'brooder_manager') {
      user = await Broodermanager.findOne({ email: emailClean, nin: ninClean });
      return res.render('broodermanagerdashboard', {
        agent: user,
        userId: user._id // Pass the user ID to the dashboard
      })
    } else {
      return res.status(400).send('Invalid role.');
    }
    
    if (!user) return res.status(400).send('User not found');
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).send('Incorrect password');
    
    req.session.userId = user._id;
    req.session.role = role;
    
    switch(role) {
      case 'youth_farmer': return res.redirect(`/viewrequests/${user._id}`);
      case 'sales_agent': return res.redirect(`/salesagentdashboard/${user._id}`);
      case 'brooder_manager': return res.redirect(`/broodermanagerdashboard/${user._id}`);
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
