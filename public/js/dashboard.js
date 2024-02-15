// server.js

const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();

// Set up your MySQL connection
const db = mysql.createConnection({
    // Your database configuration
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    getCountOfRooms((totalRooms) => {
        res.render('index', { totalRooms });
    });
});

function getCountOfRooms(callback) {
    const query = 'SELECT COUNT(*) as totalRooms FROM rooms';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Query error:', error);
            db.end();
            callback(0); // Pass 0 in case of an error
        } else {
            const totalRooms = results.length > 0 ? results[0].totalRooms : 0;
            callback(totalRooms);
        }
    });
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
