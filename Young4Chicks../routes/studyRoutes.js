const express = require("express");
const router = express.Router();
const path = require("path");

//5.Routes
//router.METHOD(PATH, HANDLER); //structure of a  route
// app.get('/', (req, res) => { // new
//     res.send('Homepage! Hello world.');
// }); //app is a method of express - app. get means when go to browser it returns info

//about
router.get('/about', (req, res) => { // new
    res.send('This is the About page.');
});

router.post('/postabout', (req, res) => { // new
    res.send('Got a POST request');
});

router.put('/user', (req, res) => { // new
    res.send('Got a PUT request at /user')
});

router.delete('/user', (req, res) => { // new
    res.send('Got a DELETE request at /user')
});


router.put('/contact', (req, res) => { // new
    res.send('Got a PUT request at /user')
});

//path parameters
router.get('/profile/:username', (req, res) => {
    res.send = ("This is a path parameter " + req.params.usernamename)
    //get profile from database using the username
});

router.get('/queryparams', (req, res) => {
    res.send = (
        "My query params are: " + req.query.class + " and " + req.query.cohort
    )
})

//serving html file
router.get("/", (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

router.get("/blog", (req, res) => {
    res.sendFile(__dirname + '/html/blogs.html')
})

router.get('/chicks', (req, res) =>{
    res.sendFile(path.join(__dirname, "./views/html/chicks.html"));
});

module.exports = router;