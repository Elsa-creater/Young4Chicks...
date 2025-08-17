const express = require('express');
const router = express.Router();
const BroodermanagerresgistrationModel = require('../models/BroodermanagerregistrationModel');
const Chickrequestform = require("../models/ChickrequestformModel");

// Dashboard route
router.get('/broodermanagerdashboard/:managerId', async (req, res) => {
  try {
    const manager = await BrooderManager.findById(req.params.managerId);
    if (!manager) return res.status(404).send('Brooder Manager not found');

    router.get('/managestock', (req, res) =>{
        res.send('Manage chick stock');
    });
    router.get('/approverequests', (req, res) =>{
        res.send('Approve or reject chick requests');
    });
    router.get('/managestock', (req, res) =>{
        res.send('Manage chick stock');
    });
    router.get('/viewreports', (req, res) =>{
        res.send('View reports');
    });
    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/loginpage');
    })

    // Pass manager object to Pug
    res.render('broodermanagerdashboard', { manager });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// manage stock
router.get('managestock/:managerId', async (req, res) => {
    try {
        const manager = await BroodermanagerresgistrationModel.findById(req.params.managerId);
        if (!manager) return res.status(404).send('Brooder Manager not found');

        res.render('managestock', {manager});
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/managestock/:managerId', async (req, res) => {
    try {
        const { stock} = req.body;
        const manager = await BroodermanagerresgistrationModel.findById(req.params.managerId);
        if (!manager) return res.status(404). send('Brooder Manager not found');

        manager.managedStock = stock;
        await manager.save();

        res.redirect('broodermanagerdashboard/${manager._id}');
    } catch (err) {
        res.status(500).send(err.message);
    }
    
});
router.get('/viewstats/:managerId', async (req, res) => {
    try {
      const manager = await Broodermanager.findById(req.params.managerId).populate('approvedRequests');
      if (!manager) return res.status(404).send('Manager not found');
  
      res.render('viewstats', { manager });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Dashboard page (GET)
router.get('/dashboard/:id', async (req, res) => {
  try {
    const manager = await BrooderManager.findById(req.params.id);
    if (!manager) {
      return res.status(404).send('Manager not found');
    }

    // Render the dashboard Pug file and pass manager data
    res.render('brooderManagerDashboard', { manager });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading dashboard');
  }
});

module.exports = router;