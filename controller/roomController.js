const Room = require('../models/rooms');
async function registerRoom(req, res){
    try{
        const {name, status, payment} = req.body;

        const newRoom = new Room({name, 
            status, 
            payment,
        });
        await newRoom.save();

        res.json({status: true, data: 'New Room registered successfully'});
    }catch(error){
        res.json({status: false, data: error.message});
    }
}

async function getRoom(req, res){
    try{
        const { id } = req.body;
        const room = await Room.findById(id);

        if(!room){
            res.json({status: false, data: 'Room not found'});
        }else{
            res.json({status: true, data: room});
        }
    }catch(error){
        res.json({status: false, data: error.message});
    }
}

async function getRoomInfo(req, res) {
    try {
        const { id } = req.body;
        const room = await Employee.findById(id);

        if (!room) {
            res.json({ status: false, data: 'Room not found' });
        } else {
            res.json({ status: true, data: room });
        }
    } catch (error) {
        res.json({ status: false, data: error.message });
    }
}


async function updateRoom(req, res){
    try{
        const {id, name, status, payment} = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            {
                name,
                status,
                payment,
            },
            {new: true}
            );

            if(!updatedRoom){
                res.json({status: false, data: 'Room not found'});
            }else{
                res.json({status: true, data: "Room updated successfully"});
            }
    }catch (error) {
        res.json({ status: false, data: error.message });
    }
}

async function deleteRoom(req, res) {
    try {
        const { id } = req.body;
        const deletedRoom = await Employee.findByIdAndDelete(id);

        if (!deletedRoom) {
            res.json({ status: false, data: 'Room not found' });
        } else {
            res.json({ status: true, data: 'Deleted successfully' });
        }
    } catch (error) {
        res.json({ status: false, data: error.message });
    }
}

module.exports = {
    registerRoom,
    getRoom,
    getRoomInfo,
    updateRoom,
    deleteRoom,
};