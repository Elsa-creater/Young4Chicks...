const express = require("express");
const router = express.Router();
const path = require("path");

app.get('/dashboard/farmer', (req, res) => {
    res.render('farmer_dashboard');
  });
  
  app.get('/dashboard/sales', (req, res) => {
    res.render('sales_dashboard');
  });
  
  app.get('/dashboard/brooder', (req, res) => {
    res.render('brooder_dashboard');
  });