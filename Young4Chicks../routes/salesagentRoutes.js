const express = require("express");
const router = express.Router();
const path = require("path");
const SalesAgent = require('../models/SalesagentModel');

router.get('/salesagentdashboard/:agentId', async (req, res) => {
  try {
    const agent = await SalesAgent.findById(req.params.agentId);

    if (!agent) return res.status(404).send('Agent not found');

    // Render dashboard and pass agent info
    res.render('salesagentdashboard', { agent });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/salesagent", async(req, res) => {
    try{
        console.log( req.body); 
        const newsalesagent = new salesagent(req.body);
        await newsalesagent.save();
       }catch(error){
               console.error("Error saving sales agent:", error);
               res.status(400).send("Internal Server Error");
           };
          console.log("Sales agent saved successfully"); 
            res.redirect('/addsalesagent'); // Redirect to the same page or another page  
   });
   
   
module.exports = router;