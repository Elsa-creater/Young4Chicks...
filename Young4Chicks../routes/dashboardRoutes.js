const express = require("express");
const router = express.Router();
const path = require("path");
const YouthFarmer = require('../models/YouthfarmerregistrationModel');
const Salesagent = require('../models/SalesagentregistrationModel');
const BrooderManager = require('../models/BroodermanagerregistrationModel');



router.get('/addyouthfarmerregistration', (req, res) => {
    res.render('📊 Welcome, Farmer!');
  });
  
router.post("/youthfarmer", async(req, res) => {
      try{
          console.log( req.body); 
          const newyouthfarmer = new youthfarmer(req.body);
          await newyouthfarmer.save();
         }catch(error){
                 console.error("Error saving youthfarmer:", error);
                 res.status(400).send("Internal Server Error");
             };
            console.log("youth farmer saved successfully"); 
              res.redirect('/addyouthfarmer'); // Redirect to the same page or another page  
     });
  
router.get('/dashboard/brooder', (req, res) => {
    res.send('🐣 Welcome, Brooder Manager!');
  });

  router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/loginpage'); // Not logged in
    }
  
    let user;
    if (req.session.role === 'youth_farmer') {
      user = await YouthFarmer.findById(req.session.userId);
    } else if (req.session.role === 'sales_agent') {
      user = await Salesagent.findById(req.session.userId);
    } else if (req.session.role === 'brooder_manager') {
      user = await BrooderManager.findById(req.session.userId);
    }
  
    if (!user) {
      return res.status(403).send("Access denied!");
    }
  
    res.render('dashboard', { user, role: req.session.role });
  });

module.exports = router;