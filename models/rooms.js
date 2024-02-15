const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('hotelmanagemet', 'root','',{
    host: 'localhost',
    dialect : 'mysql',
});

const Room = sequelize.define('Room', {
    name : {
        type : DataTypes.String,
        allowNull : false,
    },
    status : {
        type : DataTypes.String,
        allowNull : false,
    },
    payment : {
        type : DataTypes.String,
        allowNull : false,
    },
});

module.exports = Room;