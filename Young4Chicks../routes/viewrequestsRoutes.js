const express = require('express');
const router = express.Router();
const {Youthfarmer} = require('../models/UserModel');
const chickrequestform = require('../models/ChickrequestformModel');

router.get('/viewrequests/:farmerId', async (req, res) => {
  try {
    const farmer = await Youthfarmer.findById(req.params.farmerId)
      .populate('chickrequests'); // Get full request details

    if (!farmer) {
      return res.status(404).send('Farmer not found.');
    }
    res.render('viewrequests',{
        farmer: farmer,
        chickrequests: farmer.chickrequests
    });
    res.json(farmer.chickRequests);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;