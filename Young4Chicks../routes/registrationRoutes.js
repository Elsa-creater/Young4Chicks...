const express = require('express');
const router = express.Router();
const YouthFarmer = require('../models/YouthfarmerregistrationModel');
const Salesagent = require('../models/SalesagentregistrationModel');
const Broodermanager = require('../models/BroodermanagerregistrationModel');



// GET registration page
router.get('/registration', (req, res) => {
  res.render('registration');
});

// POST for Youth Farmer
router.post('/youthfarmerregistration', async (req, res) => {
  try {
    const newYouthfarmer = new Youthfarmerregistration(req.body);
    await newYouthfarmer.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST for Sales Agent
router.post('/salesagentregistration', async (req, res) => {
  try {
    const newSalesAgent = new Salesagentregistration(req.body);
    await newSalesAgent.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST for Brooder Manager
router.post('/broodermanagerregistration', async (req, res) => {
  try {
    const newBroodermanager = new Broodermanager(req.body);
    await newBroodermanager.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;