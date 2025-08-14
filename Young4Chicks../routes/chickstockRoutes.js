const express = require("express");
const router = express.Router();
const path = require("path");
const chickstock = require("../models/chickstockModel");

router.get('/addchickstock', (req, res) => {
    res.render('chickstock');
});

router.post("/chickstock", async(req, res) => {
    try{
        console.log( req.body); 
        const newchickstock = new chickstock(req.body);
        await newchickstock.save();
    }catch(error){
            console.error("Error saving chick stock:", error);
            res.status(400).send("Internal Server Error");
        };
       console.log("Chick stock saved successfully"); 
         res.redirect('/addchickstock'); // Redirect to the same page or another page  
});


module.exports = router;
