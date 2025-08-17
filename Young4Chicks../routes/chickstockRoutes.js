const express = require('express');
const router = express.Router();
const ChickStock = require('../models/ChickstockModel'); // our model

// 1️⃣ Route to show current stock page
router.get('/managestock/:id', async (req, res) => {
  try {
    const managerId = req.params.id;

    // Find stock for this manager
    const stock = await ChickStock.findOne({ _id: managerId });

    res.render('managestock', { manager: stock }); 
    // 👆 sends data to your pug file
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading stock page");
  }
});

// 2️⃣ Route to update stock
router.post('/managestock/:id', async (req, res) => {
  try {
    const managerId = req.params.id;
    const { stock } = req.body;

    // Update or create stock record
    await ChickStock.findByIdAndUpdate(
      managerId,
      { quantity: stock },
      { new: true, upsert: true } // upsert = create if not exists
    );

    res.redirect(`/managestock/${managerId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating stock");
  }
});

// 3️⃣ Route to list all stock (optional)
router.get('/allstock', async (req, res) => {
  try {
    const allStock = await ChickStock.find();
    res.render('allstock', { stockList: allStock });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stock");
  }
});

module.exports = router;