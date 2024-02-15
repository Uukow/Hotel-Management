const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 30002;
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotelmanagement',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Register the New customers
router.post('/registerCustomers', (req, res) => {
    const { cTitle, cName, cEmail, country, cPhone, cTypeRoom, cBedding, cNumRoom, cMeal, cIn, cOut } = req.body;

    const query = `CALL sp_customer('', '${cTitle}', '${cName}', '${cEmail}', '${country}', '${cPhone}', '${cTypeRoom}', '${cBedding}', '${cNumRoom}', '${cMeal}', '${cIn}', '${cOut}')`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: 'Registration successful' });
        }
    });
});

// Update the customer
router.post('/updateCustomers', (req, res) => {
    const { update_id, cTitle, cName, cEmail, country, cPhone, cTypeRoom, cBedding, cNumRoom, cMeal, cIn, cOut  } = req.body;

    const query = `CALL sp_customer('${update_id}', '${cTitle}', '${cName}', '${cEmail}', '${country}', '${cPhone}', '${cTypeRoom}', '${cBedding}', '${cNumRoom}', '${cMeal}', '${cIn}', '${cOut}')`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            const row = results[0][0];
            if (row.Message === 'Updated') {
                res.json({ status: true, data: 'Updated successful' });
            } else {
                res.json({ status: false, data: err });
            }
        }
    });
});

// Read all customer
router.get('/getCustomers', (req, res) => {
    const query = 'SELECT * FROM customer';

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results });
        }
    });
});

// Get one customer
router.post('/getCustomersInfo', (req, res) => {
    const { id } = req.body;

    const query = `SELECT * FROM customer WHERE id = '${id}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results[0] });
        }
    });
});

// Delete one employee
router.post('/deleteCustomersInfo', (req, res) => {
    const { id } = req.body;

    const query = `DELETE FROM customer WHERE id = '${id}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: 'Deleted successfully' });
        }
    });
});


// Route to fetch customer report data from the database
router.post('/getCustomerReport', (req, res) => {
    const { from, to } = req.body;
    const arrayData = [];
  
    const query = `CALL rp_customer('${from}', '${to}')`;
    db.query(query, [from, to], (error, results) => {
      if (error) {
        res.json({ status: false, data: error.message });
      } else {
        results[0].forEach(row => {
          arrayData.push(row);
        });
        res.json({ status: true, data: arrayData });
      }
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = router;