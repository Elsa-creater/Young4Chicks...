const express = require('express');
const router = express.Router();
const ChickStock = require('../models/ChickstockModel');

// 1️⃣ GET /managestock - show all stock
router.get('/managestock', async (req, res) => {
  try {
    const stockItems = await ChickStock.find();
    res.render('chickStock', { stockItems });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading stock page");
  }
});

// 2️⃣ POST /managestock - add or update stock
router.post('/managestock', async (req, res) => {
  const { type, quantity } = req.body;

  try {
    let stock = await ChickStock.findOne({ type });

    if (stock) {
      // Update existing stock
      stock.quantity = quantity;
      await stock.save();
    } else {
      // Add new stock type
      await ChickStock.create({ type, quantity });
    }

    res.redirect('/managestock');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating stock");
  }
});

// 3️⃣ Optional: List all stock
router.get('/allstock', async (req, res) => {
  try {
    const stockList = await ChickStock.find();
    res.render('allstock', { stockList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stock");
  }
});

module.exports = router;