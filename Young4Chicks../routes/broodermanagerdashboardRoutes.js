const express = require('express');
const router = express.Router();
const Broodermanager = require('../models/UserModel');
const Chickrequestform = require('../models/ChickrequestformModel');
const ChickStock = require('../models/ChickstockModel');

// ---------------------------
// Dashboard route
// ---------------------------
router.get('/broodermanager/:managerId/dashboard', async (req, res) => {
  try {
    const manager = await Broodermanager.findById(req.params.managerId);
    if (!manager) return res.status(404).send('Brooder Manager not found');

    res.render('broodermanagerdashboard', { manager });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ---------------------------
// Manage Stock
// ---------------------------
router.get('/managestock/:managerId', async (req, res) => {
  try {
    const stockItems = await ChickStock.find();
    res.render('chickStock', { stockItems, managerId: req.params.managerId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/managestock/:managerId', async (req, res) => {
  const { type, quantity } = req.body;

  try {
    let stock = await ChickStock.findOne({ type });

    if (stock) {
      stock.quantity += Number(quantity); // increment stock instead of overwriting
      await stock.save();
    } else {
      await ChickStock.create({ type, quantity });
    }

    res.redirect(`/managestock/${req.params.managerId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ---------------------------
// Approve/Reject Requests
// ---------------------------
router.get('/approverequests/:managerId', async (req, res) => {
  try {
    const requests = await Chickrequestform.find({ status: 'Pending' }).populate('farmerId', 'fullname');

    const requestsWithNames = requests.map(r => ({
      _id: r._id,
      farmerName: r.farmerId.fullname,
      quantity: r.quantity,
      type: r.chicktype,
    }));

    res.render('approveRequests', { requests: requestsWithNames });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/approverequests/:requestId/approve', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.requestId, { status: 'Approved' });
    res.redirect('back');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/approverequests/:requestId/reject', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.requestId, { status: 'Rejected' });
    res.redirect('back');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ---------------------------
// View Statistics / Report
// ---------------------------
router.get('/viewstats/:managerId', async (req, res) => {
  try {
    const requests = await Chickrequestform.find().populate('farmerId', 'fullname');

    const requestsWithNames = requests.map(r => ({
      _id: r._id,
      farmerName: r.farmerId.fullname,
      chicktype: r.chicktype,
      quantity: r.quantity,
      dateoforder: r.dateoforder,
      preferreddeliverydate: r.preferreddeliverydate,
      status: r.status
    }));

    res.render('reviewReport', { requests: requestsWithNames });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ---------------------------
// Logout
// ---------------------------
// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/loginpage'); // redirect to login page after logout
  });
});

module.exports = router;