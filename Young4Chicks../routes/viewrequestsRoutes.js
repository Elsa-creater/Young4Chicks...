const express = require('express');
const router = express.Router();
const youthFarmer = require('../models/youthfarmerregistrationModel');

router.get('/viewrequests/:farmerId', async (req, res) => {
  try {
    const farmer = await youthFarmer.findById(req.params.farmerId)
      .populate('chickRequests'); // Get full request details

    if (!farmer) {
      return res.status(404).send('Farmer not found.');
    }
    res.render('viewrequests',{
        farmer: farmer,
        chickrequests: farmer.chickRequests
    });
    res.json(farmer.chickRequests);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;