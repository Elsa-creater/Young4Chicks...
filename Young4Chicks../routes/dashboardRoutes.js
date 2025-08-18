const express = require("express");
const router = express.Router();
const path = require("path");
const { Youthfarmer, Salesagent, Broodermanager } = require('../models/UserModel');
const Chickrequestform = require('../models/ChickrequestformModel');



// ---------------------------
// Youth Farmer Dashboard
// ---------------------------
router.get('/youthfarmer/:id/dashboard', protectRoute, async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await Youthfarmer.findById(userid);
    if (!user) return res.status(404).send('User not found');

    res.render('dashboard', {user, role: 'youth_farmer'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ---------------------------
// Sales Agent Dashboard
// ---------------------------
router.get('/salesagent/:id/dashboard', protectRoute, async (req, res) => {
  try {
    const user = await Salesagent.findById(req.params.id);

    if (!user) return res.status(404).send('User not found');

    res.render('dashboard', {user, role: 'sales_agent'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ---------------------------
// Brooder Manager Dashboard
// ---------------------------
router.get('/broodermanager/:id/dashboard', protectRoute, async (req, res) => {
  try {
    const userId = req.params.id;
    // Only one Brooder Manager in your system
    const user = await Broodermanager.findById(userId);

    if (!user) return res.status(404).send('User not found');

    res.render('dashboard', {user, role: 'brooder_manager'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

function protectRoute(req, res, next) {
  if (!req.session.userId) {
    // User is not logged in, redirect to login page
    return res.redirect('/loginpage');
  }
  next();
}

// ---------------------------
// Manage stock
// ---------------------------
router.get('/managestock/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await Broodermanager.findById(userId);
  if (!user) return res.status(404).send('User not found');

  // TODO: fetch stock data from DB
  res.render('manageStock', { user });
});

// ---------------------------
// Approve requests
// ---------------------------
router.get('/approverequests/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await Broodermanager.findById(userId);
  if (!user) return res.status(404).send('User not found');

  // Fetch pending requests
  const pendingRequests = await Chickrequestform.find({ status: 'pending' });
  res.render('approveRequests', { user, pendingRequests });
});

// ---------------------------
// View statistics
// ---------------------------
router.get('/viewstats/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await Broodermanager.findById(userId);
  if (!user) return res.status(404).send('User not found');

  // Fetch all requests for statistics
  const allRequests = await Chickrequestform.find();
  res.render('viewStats', { user, requests: allRequests });
});

router.get('/assignedfarmers/:id', async (req, res) => {
  const salesagentId = req.params.id;
  // Fetch assigned farmers from DB based on salesAgentId
  const assignedFarmers = await Youthfarmer.find({ assignedSalesagent: salesAgentId });
  res.render('assignedFarmers', { assignedFarmers, salesagentId });
});


module.exports = router;