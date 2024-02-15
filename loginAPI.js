const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotelmanagement',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = {};

  const query = `CALL sp_login('${username}', '${password}')`;

  db.query(query, (err, results) => {
    if (err) {
      data.status = false;
      data.data = err.message;
      res.json(data);
    } else {
      if (results.length > 0) {
        const row = results[0][0];

        if (row.msg === 'Deny') {
          data.status = false;
          data.data = 'Username or Password Incorrect!';
        } else {
          for (const [key, value] of Object.entries(row)) {
            req.session[key] = value;
          }

          // Check the role and redirect accordingly
          if (req.session.role === 'admin') {
            data.status = true;
            data.data = 'Success';
            data.redirect = '/dashboard';
            data.role = 'admin';
          } else if (req.session.role === 'member') {
            data.status = true;
            data.data = 'Success';
            data.redirect = '/dashboard';
            data.role = 'member';
          } else {
            data.status = false;
            data.data = 'Unknown user role';
          }
        }
      } else {
        data.status = false;
        data.data = 'User not found';
      }

      res.json(data);
    }
  });
});

module.exports = router;
