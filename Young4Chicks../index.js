// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
require("dotenv").config();
const session = require("express-session");

// Use absolute paths for your models


// Import routes using absolute paths
const studyRoutes = require('./routes/studyRoutes');
const loginpageRoutes = require('./routes/loginpageRoutes');
const chickrequestformRoutes = require('./routes/chickrequestformRoutes');
const chickstockRoutes = require('./routes/chickstockRoutes');
const authRoutes = require('./routes/authRoutes')
const broodermanagerdashboardRoutes = require('./routes/broodermanagerdashboardRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Importing farmer dashboard routes
const registrationRoutes = require('./routes/registrationRoutes'); // Importing registration routes
const {Youthfarmer, Salesagent, Broodermanager} = require('./models/UserModel');
const Chickrequestform = require('./models/ChickrequestformModel');
const approverequestsRoutes = require('./routes/approverequestsRoutes');
const viewreportRoutes = require('./routes/viewreportRoutes');


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
app.use(session({
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get("/", (req,res) => res.render("home"));
app.get('/about', (req, res) => res.render('about')); // About page
app.get('/register', (req, res) => res.render('register')); // Registration page
app.get('/login', (req, res) => res.render('login')); // Login page

app.get("/assignedfarmers/:id", async (req, res) => {
  const userId = req.params.id;
  // TODO: Fetch assigned farmers from DB
  res.send(`Assigned farmers for Sales Agent ${userId}`);
});
// Chick request form
app.get("/chickrequestform/:id", (req, res) => {
  const userId = req.params.id;
  res.render("chickRequestForm", { userId });
});

// View my requests
app.get("/viewrequest/:salesagentid", (req, res) => {
  const userId = req.params.id;
  res.render("viewRequests", { userId });
});

// Contact Sales Agent
app.get("/salesagent", (req, res) => {
  // Later we can fetch their assigned sales agent
  res.send("Contact your Sales Agent (coming soon)");
});

// Manage chick stock
app.get("/managestock/:id", (req, res) => {
  const userId = req.params.id;
  // Later: fetch stock info from DB
  res.send(`Manage chick stock page for Brooder Manager ${userId}`);
});

// Approve or reject requests
// GET: Brooder Manager approves/rejects requests
app.get('/approverequests/:managerId', async (req, res) => {
  try {
    // Fetch all pending chick requests
    const requests = await Chickrequestform.find({ status: 'Pending' })
      .populate('farmerId', 'fullname'); // populate farmer name

    // Transform to include farmerName in each request
    const requestsWithNames = requests.map(r => ({
      _id: r._id,
      farmerName: r.farmerId.fullname,
      quantity: r.quantity,
      type: r.chicktype, // adjust to match your schema
    }));

    res.render('approveRequests', { requests: requestsWithNames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading requests');
  }
});

// GET: Brooder Manager views all requests
app.get('/viewstats', async (req, res) => {
  try {
    // Fetch all chick requests from the database
    const requests = await Chickrequest.find();

    res.render('viewStats', { requests });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading statistics");
  }
});

app.get('/viewrequests/:farmerId', async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    // Fetch all requests made by this farmer
    const requests = await Chickrequestform.find({ farmerId });

    res.render('viewrequest', { requests, userId: farmerId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching requests");
  }
});


// app.listen(...) at the bottom

app.use("/", loginpageRoutes);
app.use("/", chickrequestformRoutes);
app.use("/", chickstockRoutes);
app.use("/", authRoutes);
app.use("/", broodermanagerdashboardRoutes);
app.use("/", studyRoutes);
app.use("/", dashboardRoutes); // Use farmer dashboard routes
app.use("/", registrationRoutes); // Use registration routes
app.use("/", approverequestsRoutes);
app.use("/", viewreportRoutes);


// 404
app.use((req,res) => res.status(404).send("Oops! Route not found."));

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
