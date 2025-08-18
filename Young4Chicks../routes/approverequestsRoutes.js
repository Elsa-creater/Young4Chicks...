const express = require('express');
const router = express.Router();
const Chickrequestform = require('../models/ChickrequestformModel');

// GET: show pending requests
router.get('/approverequests', async (req, res) => {
  try {
    const requests = await Chickrequestform.find({ status: 'Pending' })
      .populate('farmerId', 'fullname');

    const formatted = requests.map(r => ({
      _id: r._id,
      farmerName: r.farmerId ? r.farmerId.fullname : "Unknown",
      quantity: r.quantity,
      type: r.chicktype
    }));

    res.render('approverequests', { requests: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading requests");
  }
});

// POST: Approve a request
router.post('/approverequests/:id/approve', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.redirect('/approverequests');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error approving requests");
  }
});

// POST: Reject a request
router.post('/approverequests/:id/reject', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.redirect('/approverequests');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error rejecting request");
  }
});

module.exports = router;