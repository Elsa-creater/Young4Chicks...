//1.Dependencies
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const Schema = mongoose.Schema;
const connectEnsureLogin = require('connect-ensure-login');
const User = require("./models/UserModel"); // Import User model
require("dotenv").config(); // to load environment variables from .env file
const expressSession = require("express-session")({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
 });

//importing routes
const studyRoutes = require("./routes/studyRoutes");
const loginpageRoutes = require("./routes/loginpageRoutes");
const youthfarmerRoutes = require("./routes/youthfarmerRoutes");
const salesagentRoutes = require("./routes/salesagentRoutes");
const chickrequestformRoutes = require("./routes/chickrequestformRoutes");
const chickstockRoutes = require("./routes/chickstockRoutes");
const authRoutes = require("./routes/AuthRoutes");
const broodermanagerregistrationRoutes = require("./routes/broodermanagerregistrationRoutes");
const broodermanagerdashboardRoutes = require("./routes/broodermanagerdashboardRoutes"); // Importing brooder manager dashboard routes
 
; // Importing farmer dashboard routes
// const authRoutes = require("./routes/AuthRoutes"); // Importing authentication routes
//2.Instatiations
const app = express();
const port = 3000;

//3.Configurations
mongoose.connect(process.env.DATABASE);// connect to the database using the environment variable DATABASE
 mongoose.connection
.once("open", () => {
     console.log("Mongoose connection opened successfully");
})
.on("error", (error) =>{
    console.error("Connection error: ${error.message}");
 });


app.set("view engine", "pug") // set pug as the view engine
app.set('views', path.join(__dirname,'views')); // specify the folder containing the frontend files
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public folder



//4.Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); // to parse JSON bodies
// Express session configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Passport.js configuration

//for non existence routes

// Simple time request logger// monitors every single route since it has no specific command
// app.use((req, res, next) => {
//     console.log("A new request recieved at" + Date.now());
//     next();
// });

app.use("/about", (req, res, next) => { //monitors a specific route about
    console.log("A new request recieved at" + Date.now());
    next();
});
app.get("/", (req, res) => {
    res.send('Server is running successfully!');
}); // send a response when the root route is accessed
// app.use(express.urlencoded({ extended: false}));

// app.use(express.static(path.join(__dirname, 'public')));

//5.Use Imported Routes

app.use("/study", studyRoutes);
app.use("/", loginpageRoutes);
app.use("/", youthfarmerRoutes);
app.use("/", salesagentRoutes);
app.use("/", chickrequestformRoutes);
app.use("/", chickstockRoutes);
app.use("/", authRoutes);
app.use("/", broodermanagerregistrationRoutes);
app.use("/", broodermanagerdashboardRoutes); // Use brooder manager dashboard routes


//understanding how to serve  html files on the web browser using a route
// router.get("/chicks", (req, res) => {
//     res.sendFile(__dirname + "/views/html/chicks.html");
// });


//always above the server
//for non existence routes
app.use((req, res) => {
    res.status(404).send("Oops! Route not Found.");
});

app.post('/login', async (req,res) => {
    const { role, username, password } =req.body;
    try {
        const user = await User.findOne({ username, password, role});
        if (!user) return res.send('invalid credentials');

        if (role ==='sales_agent') return res.redirect('/dashboard/sales');
        if (role ==='youth_farmer') return res.redirect('/dashboard/youthfarmer');
        if (role ==='brooder_manager') return res.redirect('/dashboard/broodermanager');

    } catch (error) {
        res.status(500).send('Login error');
    }
})

//6.Bootsrapping the server
//Start the server  
// always the last line in this file
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});