// routes/index.js for general routes
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file when users access the root path ("/")
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/about', (req, res) => {
    // Render the about page
    res.sendFile(path.join(__dirname, '../public/about.html'));
});
router.get('/employees', (req, res) => {
    // Render the about page
    res.sendFile(path.join(__dirname, '../public/employees.html'));
});

router.get('/rooms', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/rooms.html'));
});

router.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/customer.html'));
});
router.get('/custReport', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/custReport.html'));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

router.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/login.html'));
})
router.get('/user', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/user.html'));
})


router.get('/contact', (req, res) => {
    // Render the contact page
    res.send('Contact Us Page');
});

// Add more routes as needed

module.exports = router;
