const express = require("express");
const router = express.Router();
const path = require("path");

// Absolute path for the model
const Farmer = require(path.join(__dirname, "..", "models", "youthfarmerregistrationModel"));

// GET route: show registration page
router.get('/youthfarmerregistration', (req, res) => {
    res.render('youthfarmerregistration');
});

// POST route: save form to MongoDB
// POST route: save form to MongoDB
router.post('/youthfarmerregistration', async (req, res) => {
  try {
    const newfarmer = new Farmer(req.body);
    await newfarmer.save();

    // Redirect to a success page or render a confirmation
    res.render('registrationSuccess', { fullname: newfarmer.fullname });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;


// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const youthfarmer = require(path.join(__dirname, "models", "youthfarmerregistrationModel"));
// // const youthfarmer = require("../models/youthfarmerregistrationModel");

// router.get('/youthfarmerregistration', (req, res) => {
//     res.render('youthfarmerregistration');
// });


// router.post('/youthfarmerregistration', async (req, res) => {
//   try {
//     const newfarmer = new youthfarmer(req.body);
//     await newfarmer.save();
//     res.send('Farmer registered successfully!');
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });
// app.post('/youthfarmerregistration', async (req, res) => {
//   // Save form data to MongoDB here
// });


       
// module.exports = router;


// router.post("/youthfarmer", async(req, res) => {
//      try{
//             console.log( req.body); 
//             const newyouthfarmer = new youthfarmer(req.body);
//             await newyouthfarmer.save();
//         }catch(error){
//                 console.error("Error saving youth farmer:", error);
//                 res.status(400).send("Internal Server Error");
//             };
//            console.log("youth farmer registered successfully"); 
//              res.redirect('/addyouthfarmer'); // Redirect to the same page or another page  
//     });