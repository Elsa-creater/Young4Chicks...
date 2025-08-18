const express = require('express');
const router = express.Router();
const { Youthfarmer, Salesagent, Broodermanager } = require('../models/UserModel');

// ---------------------------
// GET registration page
// ---------------------------
router.get('/registration', (req, res) => {
  res.render('registration');
});

// ---------------------------
// POST route for registering any role
// ---------------------------
router.post('/register', async (req, res) => {
  try {
    const {
      role,
      email,
      nin,
      password,
      fullname,
      phonenumber,
      agegroup,
      nameofbusiness,
      location,
      assignedarea
    } = req.body;

    const emailClean = email.trim().toLowerCase();
    const ninClean = nin.trim();

    // Select the appropriate model
    let Model;
    if (role === 'youth_farmer') Model = Youthfarmer;
    else if (role === 'sales_agent') Model = Salesagent;
    else if (role === 'brooder_manager') Model = Broodermanager;
    else return res.status(400).send('Invalid role.');

    // Check if email or NIN already exists
    if (await Model.findOne({ email: emailClean })) return res.status(400).send('Email already exists.');
    if (await Model.findOne({ nin: ninClean })) return res.status(400).send('NIN already exists.');

    // Create new user
    const newUser = new Model({
      email: emailClean,
      nin: ninClean,
      password,
      fullname,
      phonenumber,
      agegroup: role === 'youth_farmer' ? agegroup : undefined,
      nameofbusiness: role === 'youth_farmer' ? nameofbusiness : undefined,
      location: role === 'youth_farmer' ? location : undefined,
      assignedarea: role === 'sales_agent' ? assignedarea : undefined
    });

    await newUser.save();
    res.redirect('/loginpage');

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user: ' + err.message);
  }
});

// ---------------------------
// AJAX check if email is available
// ---------------------------
router.post('/check-email', async (req, res) => {
  const { email, role } = req.body;
  const emailClean = email.trim().toLowerCase();

  let Model;
  if (role === 'youth_farmer') Model = Youthfarmer;
  else if (role === 'sales_agent') Model = Salesagent;
  else if (role === 'brooder_manager') Model = Broodermanager;
  else return res.status(400).json({ available: false });

  const exists = await Model.findOne({ email: emailClean });
  res.json({ available: !exists });
});

// ---------------------------
// AJAX check if NIN is available
// ---------------------------
router.post('/check-nin', async (req, res) => {
  const { nin, role } = req.body;
  const ninClean = nin.trim();

  let Model;
  if (role === 'youth_farmer') Model = Youthfarmer;
  else if (role === 'sales_agent') Model = Salesagent;
  else if (role === 'brooder_manager') Model = Broodermanager;
  else return res.status(400).json({ available: false });

  const exists = await Model.findOne({ nin: ninClean });
  res.json({ available: !exists });
});

module.exports = router;








// const router = express.Router();
// const {Youthfarmer, Salesagent, Broodermanager} = require('../models/UserModel'); // Unified User model

// // GET registration page
// router.get('/registration', (req, res) => {
//   res.render('registration');
// });

// // POST route for all roles
// router.post('/register', async (req, res) => {
//   try {
//     const { role, email, nin, password, fullname, phonenumber, agegroup, nameofbusiness, location, assignedarea } = req.body;

//     const emailClean = email.trim().toLowerCase();
//     const ninClean = nin.trim();

//     let Model;
//     if (role === 'youth_farmer') {
//       Model = Youthfarmer;
//     } else if (role === 'sales_agent') {
//       Model= Salesagent;
//     } else if (role === 'brooder_manager') {
//       Model = Broodermanager;
//     } else {
//       return res.status(400).json({available: false});
//     }
//     const exists = await Model.fondone({ email: emailClean });
//     res.json({ available: !exists });
//     // Check if email or NIN already exists
//     if (await User.findOne({ email: emailClean })) return res.status(400).send('Email already exists.');
//     if (await User.findOne({ nin: ninClean })) return res.status(400).send('NIN already exists.');

//     // Create new user
//     const newUser = new User({
//       role,
//       email: emailClean,
//       nin: ninClean,
//       password,
//       fullname,
//       phonenumber,
//       // Only include these if the role needs them
//       agegroup: role === 'youth_farmer' ? agegroup : undefined,
//       nameofbusiness: role === 'youth_farmer' ? nameofbusiness : undefined,
//       location: role === 'youth_farmer' ? location : undefined,
//       assignedarea: role === 'sales_agent' ? assignedarea : undefined
//     });

//     await newUser.save();
//     res.redirect('/loginpage');

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error registering user: ' + err.message);
//   }
// });

// // AJAX checks for email or NIN availability
// router.post('/check-email', async (req, res) => {
//   const { email } = req.body;
//   const exists = await User.findOne({ email: email.trim().toLowerCase() });
//   res.json({ available: !exists });
// });

// router.post('/check-nin', async (req, res) => {
//   const { nin } = req.body;
//   const exists = await User.findOne({ nin: nin.trim() });
//   res.json({ available: !exists });
// });

// module.exports = router;
