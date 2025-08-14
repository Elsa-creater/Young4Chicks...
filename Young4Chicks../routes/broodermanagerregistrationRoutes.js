const express = require('express');
const router = express.Router();    
const path = require('path');
const BrooderManagerRegistration = require('../models/BroodermanagerregistrationModel');

router.get('/addbroodermanagerresgistration', (req, res) => {
    res.render('Broodermanagerregistration', { title: 'Register Brooder Manager' });
});

router.post('/broodermanagerregistration', async (req, res) => {
  try {
    const newManager = new BrooderManagerRegistration(req.body);
    await newManager.save();
    res.send('Brooder Manager registered successfully!');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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


module.exports = router;