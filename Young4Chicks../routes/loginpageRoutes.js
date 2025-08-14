const express = require("express");
const router = express.Router();
const path = require("path");
const youthFarmer = require("../models/youthfarmerModel");
const SalesAgent = require("../models/SalesagentModel");
const loginpage = require("../models/loginpagemodel");
const BrooderManagerRegistration = require("../models/BroodermanagerregistrationModel");

router.get('/addloginpage', (req, res) => {
    res.render('loginpage');
});

router.post('/loginpage', async (req, res) => {
  try {
    const { role, username, idnumber, password } = req.body;
    let user;

    // Check role and find user in the correct collection
    if (role === 'youth_farmer') {
      user = await Farmer.findOne({ email: username, nin: idnumber });
    } else if (role === 'sales_agent') {
      user = await SalesAgent.findOne({ email: username, idnumber: idnumber });
    } else if (role === 'brooder_manager') {
      user = await BrooderManager.findOne({ email: username, idnumber: idnumber });
    } else {
      return res.status(400).send('Invalid role selected.');
    }

    if (!user) {
      return res.status(400).send('User not found. Please register first.');
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).send('Incorrect password.');
    }

    // Redirect to dashboard based on role
    if (role === 'youth_farmer') {
      return res.redirect(`/viewrequests/${user._id}`); // Farmer dashboard
    } else if (role === 'sales_agent') {
      return res.redirect(`/salesagentdashboard/${user._id}`);
    } else if (role === 'brooder_manager') {
      return res.redirect(`/broodermanagerdashboard/${user._id}`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});




module.exports = router;