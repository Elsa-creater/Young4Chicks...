const express = require("express");
const router = express.Router();
const path = require("path");
const youthfarmer = require("../models/youthfarmerregistrationModel");

app.get('/addyouthfarmer', (req, res) => {
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
  
app.get('/dashboard/brooder', (req, res) => {
    res.send('🐣 Welcome, Brooder Manager!');
  });