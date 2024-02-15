const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./empAPi');
const room = require('./RoomApi');
const customer = require('./Customer');
const dashboards = require('./dashApi');
const loginBtn = require('./loginAPI');

const app = express();
const port = 30000; // Set your desired port

app.use(session({
    secret: 'uukow', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your existing routes for general pages (e.g., index, about, contact)
app.use('/', require('./routes/index'));

// API routes for All
app.use('/api', require('./empAPi'));
app.use('/api', require('./RoomApi'));
app.use('/api', require('./Customer'));
app.use('/api', require('./dashApi'));
app.use('/api', require('./loginAPI'));
app.use('/api', require('./userAPI'));
// Api routes for rooms

// router.use('/api', require('./RoomApi'));


// app.use('/api/employees', require('./routes/employees'));
// app.use('/api', require('./routes/employees')); 
// Static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
