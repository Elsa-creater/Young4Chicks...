const express = require("express");
const router = express.Router();
const User = require("../models/UserModel")
const passport = require("passport");
const youthfarmerregistrationModel = require("../models/ChickrequestformModel");

// sign Up  route as a youth farmer
router.get("/youthfarmer", (req, res) => {
    res.render("youthfarmer");
});
router.post("/youthfarmer", async (req,res) => {
    try {
        const User = new User(req.body);
        let existingUser = await User.findone({ email:req.body.email});
        if (existingUser) {
            return res.status(500).send("User already exists");
        }else{
            await User.register(User, req.body.password, (err) =>{
                if (err) {
                    throw err;
                }
                res.redirect("/loginpage");
            });
        }
    } catch (error) {
        res.status(500).send("Sorry, You not able to sign up at this time");
    }
});

// sign Up  route as a sales agent
router.get("/salesagent", (req, res) => {
    res.render("salesagent");
});
router.post("/salesagent", async (req,res) => {
    try {
        const User = new User(req.body);
        let existingUser = await User.findone({ email:req.body.email});
        if (existingUser) {
            return res.status(500).send("User already exists");
        }else{
            await User.register(User, req.body.password, (err) =>{
                if (err) {
                    throw err;
                }
                res.redirect("/loginpage");
            });
        }
    } catch (error) {
        res.status(500).send("Sorry, You not able to sign up at this time");
    }
});

// Login route
router.get("/loginpage", (req,res) => {
    res.render("loginpage");
})
router.post("/loginpage", passport.authenticate("local", {failureRedirect:"/login"}), (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "youthfarmer"){
        res.send(" This is youth farmer dashboard");
  }else if(req.user.role == "youth farmer"){
        res.send("This is the youth farmer dashboard");
  }
});
router.get("/loginpage", (req,res) => {
    res.render("loginpage");
})
router.post("/loginpage", passport.authenticate("local", {failureRedirect:"/login"}), (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "salesagent"){
        res.send("This is sales agent dashboard");    
  }else if(req.user.role == "sales agent"){
        res.send("This is the sales dashboard");
  }
});

// Registration route

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/youthfarmerregistration", (req, res) => {
    res.render("youthfarmerregistration");
});
router.get("/broodermanagerregistration", (req, res) => {
    res.render("broodermanagerregistration");
});

// Logout route
router.get("/logout", (req, res) => {
    // Logic to handle logout
    res.redirect("/loginpage");
});
router.get("/addloginpage", (req, res) => {
    res.render("loginpage");
});

module.exports = router;
// This code defines routes for user authentication, including login and registration.
// It uses Express.js to handle HTTP requests and MongoDB models to interact with the database.const SalesagentModel = require("../models/SalesagentModel");