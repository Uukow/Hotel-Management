// dashboard.js
const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotelmanagement',
});

// Route to render the dashboard with the total number of rooms
router.get('/dashRooms', (req, res) => {
  // Query to get the total number of rooms
  const query = 'SELECT COUNT(*) as totalRooms FROM rooms';
  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Process the result and send HTML as a response
    const totalRooms = results[0].totalRooms || 0;
    // Send the dashboard data with the totalRooms value
    res.send({data: totalRooms});
  });
});
// route to render th dashboard with the total Employees
router.get('/dashCustomers', (req, res) => {
  // query the customers
  const query = 'SELECT COUNT(*) as totalCustomers FROM customer ';
  // excute the query
  db.query(query, (err,results) => {
    if (err) {
      console.error('error executing', err);
      res.status(500).json({ error: 'internal server error' });
      return;
    }
    const totalCusomers = results[0].totalCustomers || 0;
    // send the data into dashboard
    res.send({data: totalCusomers});
  });
});
// route to render th dashboard with the total Customers
router.get('/dashEmployees', (req, res) => {
  // query the customers
  const query = 'SELECT COUNT(*) as totalEmployees FROM employees ';
  // excute the query
  db.query(query, (err,results) => {
    if (err) {
      console.error('error executing', err);
      res.status(500).json({ error: 'internal server error' });
      return;
    }
    const totalEmployees = results[0].totalEmployees || 0;
    // send the data into dashboard
    res.send({data: totalEmployees});
  });
});
router.get('/dashUser', (req, res) => {
  const query = 'SELECT COUNT(*) as totalUsers FROM user';
  db.query(query, (err,results) => {
    if (err) {
      console.error('error executing', err);
      res.status(500).json({ error: 'internal server error' });
      return;
    }
    const totalUsers = results[0].totalUsers || 0;
    res.send({data: totalUsers});
  });
})

module.exports = router;
