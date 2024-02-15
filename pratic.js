const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'hotelmanagement',
});

('/dashboard', (req, res)=>{
    const query = 'SELECT COUNT(*) as totalDashbord FROM user';
    db.query(query, (err,results)=>{
        if(err){
            console.error('excution error',err);
            res.status(500).json({error: 'internal Server error'});
            return;
        }
        const totalDashbord = results[0].totalDashbord || 0;
        res.send({data: totalDashbord});
    })
})