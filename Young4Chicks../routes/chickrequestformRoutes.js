const express = require("express");
const router = express.Router();
const path = require("path");
const chickrequestform = require("../models/ChickrequestformModel");
const {Youthfarmer} = require("../models/UserModel");

router.get('/chickrequestform', protectRoute, (req, res) => {
    res.render('chickrequestform');
});


// Handle chick request form submission
router.post('/chickrequestform', protectRoute, async (req, res) => {
  try {
    const { chicktype, quantity, deliveryDate } = req.body;
    const userId = req.body.userId; // Assuming userId is passed in the request body
    if (!user) return res.status(400).send('User ID is required');

    // Find the youth farmer
    const user = await Youthfarmer.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Correctly declare the new request
    const newRequest = new chickrequestform({
      farmerId: user._id,
      chicktype,
      quantity,
      preferreddeliverydate: deliveryDate,
      status: 'Pending'
    });

    await newRequest.save();

    res.send('Chick request submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

 

// Approve Requests page
router.get('/approverequests/:managerId', async (req, res) => {
  try {
    const requests = await chickrequestform.find({ status: 'Pending' });
    res.render('approverequests', { requests, managerId: req.params.managerId });
  } catch (err) {
    res.status(500).send('Error loading the requests');
  }
});

// Handle approval
router.post('/approverequests/:requestId/approve', async (req, res) => {
  try {
    const request = await chickrequestform.findById(req.params.requestId);
    request.status = 'Approved';
    await request.save();
    res.redirect('back');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle rejection
router.post('/approverequests/:requestId/reject', async (req, res) => {
  try {
    const request = await chickrequestform.findById(req.params.requestId);
    request.status = 'Rejected';
    await request.save();
    res.redirect('back');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

function protectRoute(req, res, next) {
  if (!req.session.userId) {
    // User is not logged in, redirect to login page
    return res.redirect('/loginpage');
  }
  next();
}

module.exports = router;

