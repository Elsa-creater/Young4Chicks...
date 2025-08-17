const Chickrequestform = require('../models/ChickrequestformModel'); // your request model

// GET: show pending requests
app.get('/approverequests', async (req, res) => {
  try {
    const requests = await Chickrequestform.find({ status: 'Pending' });
    res.render('approveRequests', { requests });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading requests");
  }
});

// POST: Approve a request
app.post('/approverequests/:id/approve', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.redirect('/approverequests');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error approving request");
  }
});

// POST: Reject a request
app.post('/approverequests/:id/reject', async (req, res) => {
  try {
    await Chickrequestform.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.redirect('/approverequests');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error rejecting request");
  }
});