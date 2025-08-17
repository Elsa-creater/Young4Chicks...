// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
require("dotenv").config();

// Use absolute paths for your models
const User = require('./models/UserModel');

// Import routes using absolute paths
const studyRoutes = require('./routes/studyRoutes');
const loginpageRoutes = require('./routes/loginpageRoutes');
const chickrequestformRoutes = require('./routes/chickrequestformRoutes');
const chickstockRoutes = require('./routes/chickstockRoutes');
const authRoutes = require('./routes/authRoutes')
const broodermanagerdashboardRoutes = require('./routes/broodermanagerdashboardRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Importing farmer dashboard routes
const registrationRoutes = require('./routes/registrationRoutes'); // Importing registration routes
// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Express session
const expressSession = require("express-session")({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/young4chicks')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get("/", (req,res) => res.send("Young4Chicks Server is running successfully!"));

app.use("/", loginpageRoutes);
app.use("/", chickrequestformRoutes);
app.use("/", chickstockRoutes);
app.use("/", authRoutes);
app.use("/", broodermanagerdashboardRoutes);
app.use("/", studyRoutes);
app.use("/", dashboardRoutes); // Use farmer dashboard routes
app.use("/", registrationRoutes); // Use registration routes


// 404
app.use((req,res) => res.status(404).send("Oops! Route not found."));

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
