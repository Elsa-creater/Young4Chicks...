const express = require('express');
const router = express.Router();
const chickstock = require('../models/ChickstockModel');

// GET: Show Manage Stock page for any logged-in Brooder Manager
router.get('/managestock/:managerId', async (req, res) => {
  try {
    const stockItems = await chickstock.find(); // fetch all stock
    res.render('chickStock', { stockItems, managerId: req.params.managerId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading stock page");
  }
});

// POST: Add or increment stock
router.post('/managestock/:managerId', async (req, res) => {
  const { type, quantity } = req.body;
  const qtyToAdd = parseInt(quantity);

  try {
    let stock = await chickstock.findOne({ type });

    if (stock) {
      stock.quantity += qtyToAdd;  // increment existing stock
      await stock.save();
    } else {
      await ChickStock.create({ type, quantity: qtyToAdd }); // add new type
    }

    res.redirect(`/managestock/${req.params.managerId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating stock");
  }
});

module.exports = router;