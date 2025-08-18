const express = require('express');
const router = express.Router();
const chickrequestform = require('../models/ChickrequestformModel'); // your requests model

// GET: Brooder Manager View Report / Statistics
router.get('/viewreport/:managerId', async (req, res) => {
  try {
    // Fetch all chick requests
    const requests = await chickrequestform.find()
      .populate('farmerId', 'fullname'); // to get farmer name

    // Map the requests to include farmerName
    const requestsWithNames = requests.map(r => ({
      _id: r._id,
      farmerName: r.farmerId.fullname,
      chicktype: r.chicktype,
      quantity: r.quantity,
      dateoforder: r.dateoforder,
      preferreddeliverydate: r.preferreddeliverydate,
      status: r.status
    }));

    // Render the Pug template
    res.render('viewReport', { requests: requestsWithNames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading report');
  }
});

module.exports = router;