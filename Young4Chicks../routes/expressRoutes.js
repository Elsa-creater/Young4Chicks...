const express = require("express");
const router = express.Router();
const path = require("path");
const Youthfarmerregistration = require('../models/Youthfarmerregistration');
const Salesagentregistration = require('../models/Salesagentregistration');
const Broodermanagerregistration = require('../models/Broodermanagerregistration');

router.get('/registration', (req, res) => {
  res.render('registration'); // Renders registration.pug
});

router.post('/youthfarmerregistration', async (req, res) => {
  try {
    const newYouthfarmer = new Youthfarmer(req.body);
    await newYouthfarmer.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ------------------------
// POST route for Sales Agent
// ------------------------
router.post('/salesagentregistration', async (req, res) => {
  try {
    const newSalesAgent = new Salesagentregistration(req.body);
    await newSalesAgent.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ------------------------
// POST route for Brooder Manager
// ------------------------
router.post('/broodermanagerregistration', async (req, res) => {
  try {
    const newBrooderManager = new Broodermanagerregistration(req.body);
    await newBrooderManager.save();
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/farmerdashboard/:id', async (req, res) => {
  const farmer = await YouthFarmer.findById(req.params.id);
  res.render('farmer_dashboard', { 
    fullname: farmer.fullname,
    userId: farmer._id // pass the ID
  });
});

router.get('/salesagentdashboard/:id', async (req, res) => {
  const agent = await SalesAgent.findById(req.params.id);
  res.render('sales_dashboard', { 
    agent: agent,       // pass the agent object
    userId: agent._id   // optional if you need ID in links
  });
});

router.get('/broodermanagerdashboard/:id', async (req, res) => {
  const manager = await BrooderManager.findById(req.params.id);
  res.render('brooder_dashboard', { 
    manager: manager,
    userId: manager._id
  });
});
router.get('/dashboard/farmer', (req, res) => {
    res.render('farmer_dashboard');
  });
  
  router.get('/dashboard/sales', (req, res) => {
    res.render('sales_dashboard');
  });
  
  router.get('/dashboard/brooder', (req, res) => {
    res.render('brooder_dashboard');
  });



module.exports = router;