// views/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file when users access the root path ("/")
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
// About Page
router.get('/about', (req, res) => {
    // Render the about page
    res.sendFile(path.join(__dirname, '../public/about.html'));
});
router.get('/registerEmployees', (req, res) => {
    // Render the about page
    res.sendFile(path.join(__dirname, '../public/Api/Employees.js'));
});
// Define other general routes if needed

module.exports = router;
