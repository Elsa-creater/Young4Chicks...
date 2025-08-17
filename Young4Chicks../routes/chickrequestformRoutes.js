const express = require("express");
const router = express.Router();
const path = require("path");
const chickrequestform = require("../models/ChickrequestformModel");

router.get('/chickrequestform', (req, res) => {
    res.render('chickrequestform');
});


// Handle chick request form submission
router.post('/chickrequestform', async (req, res) => {
  try {
    // Find farmer based on email (or you can use NIN)
    const farmer = await youthFarmer.findOne({ email: req.body.email });

    if (!farmer) {
      return res.status(404).send('Farmer not found. Please register first.');
    }

    // Create new chick request with farmer ID
    const newchickrequestform = new chickrequestform({
      ...req.body,
      farmer: farmer._id
    });

    // Save the request
    const savedRequest = await newRequest.save();

    // Add request ID to farmer's chickRequests array
    farmer.chickRequests.push(savedRequest._id);
    await farmer.save();

    res.send('Chick request submitted successfully and linked to your profile!');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// View requests page
router.get('/approverequests', async (req, res) => {
    try {
      const requests = await chickrequestform.find({ status: 'Pending' });
      res.render('approveRequests', { requests });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading the requests');
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


// router.post("/chickrequestform", async(req, res) => {
//     try{
//         console.log( req.body); 
//         const newchickrequestform = new chickrequestform(req.body);
//         await newchickrequestform.save();
//     }catch(error){
//             console.error("Error saving chick request:", error);
//             res.status(400).send("Internal Server Error");
//         };
//        console.log("Chick request saved successfully"); 
//          res.redirect('/addchickrequestform'); // Redirect to the same page or another page  
// });


module.exports = router;




  // .then(() => {
        //     console.log("Chick request saved successfully");
        //     res.redirect('/addchickrequestform'); // Redirect to the same page or another page
        // })