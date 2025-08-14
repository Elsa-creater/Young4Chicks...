const express = require("express");
const loginpagemodel = require("../models/loginpagemodel");
const router = express.Router();
constUser = require("../models/UserModel")
const passport = require("passport");

// sign Up  route as a youth farmer
router.get("/youthfarmer", (req, res) => {
    res.render("youthfarmer");
});
router.post("/youthfarmer", async (req,res) => {
    try {
        const user = new User(req.body);
        let existingUser = await User.findone({ email:req.body.email});
        if (existingUser) {
            return res.status(500).send("User already exists");
        }else{
            await User.register(user, req.body.password, (err) =>{
                if (err) {
                    throw err;
                }
                res.redirect("/login");
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
        const user = new User(req.body);
        let existingUser = await User.findone({ email:req.body.email});
        if (existingUser) {
            return res.status(500).send("User already exists");
        }else{
            await User.register(user, req.body.password, (err) =>{
                if (err) {
                    throw err;
                }
                res.redirect("/login");
            });
        }
    } catch (error) {
        res.status(500).send("Sorry, You not able to sign up at this time");
    }
});

// Login route
router.get("/login", (req,res) => {
    res.render("login");
})
router.post("/login", passport.authenticate("local", {failureRedirect:"/login"}), (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "youthfarmer"){
        res.send(" This is youth farmer dashboard");
  }else if(req.user.role == "youth farmer"){
        res.send("This is the youth farmer dashboard");
  }
});
router.get("/login", (req,res) => {
    res.render("login");
})
router.post("/login", passport.authenticate("local", {failureRedirect:"/login"}), (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "salesagent"){
        res.send("This is sales agent dashboard");    
  }else if(req.user.role == "sales agent"){
        res.send("This is the sales dashboard");
  }
});

// Registration route
const SalesagentModel = require("../models/SalesagentModel");
router.get("/register", (req, res) => {
    res.render("register");
});

const YouthfarmerModel = require("../models/youthfarmerregistrationModel");
router.get("/youthfarmer", (req, res) => {
    res.render("youthfarmer");
});

// Logout route
router.get("/logout", (req, res) => {
    // Logic to handle logout
    res.redirect("/login");
});
const User = require("../models/UserModel");
router.get("/addloginpage", (req, res) => {
    res.render("loginpage");
});

module.exports = router;
// This code defines routes for user authentication, including login and registration.
// It uses Express.js to handle HTTP requests and MongoDB models to interact with the database.