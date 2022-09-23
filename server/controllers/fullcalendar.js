const { events } = require('../models/Booking');
const Booking = require('../models/Booking');
const User = require("../models/User");


exports.queryEvent = async(req,res) => {
    try {
        console.log(req.body);
        const qbooking = await Booking.find({
            start:{
                $gte: new Date (req.body.datestart),
                $lte: new Date (req.body.dateend)
            },
        });
        res.send(qbooking)
    } catch (err) {
        console.log("Server Errorr");
        res.status(500).send("Server Error");
    }
}

exports.listEventwithcon = async(req,res)=> {
    try {
        console.log(req.body);
        const bookingbasedoncourt = await Booking.find({
            courtNum:{
                $eq: (req.body.courtNum)
            },
        });
        res.send(bookingbasedoncourt)
    } catch (err) {
        console.log("Server Error");
        res.status(500).send("Server Error");
    }
}

exports.createEvent = async(req,res)=> {
    try {
        res.send(await new Booking(req.body).save())
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
    }
}


exports.listEvent = async(req,res)=> {
    try {
        res.send(await Booking.find({}))   
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
    }
}

exports.currentMonth = async(req,res)=> {
    try {
        const currentM = await Booking.find({
            "$expr": {
                "$eq":[{
                    "$month":"$start"
                },req.body.mm]
            }
        }).sort({start : 1})
        res.send(currentM)   
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
    }
}

exports.deleteEvent = async (req,res) => {
    try {
        res.send(await Booking.findOneAndDelete(
            { _id: req.params.id}
        ))
        res.send('Delete Success!')
    } catch(err) {
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

exports.checkUserExist = async (req,res) => {
    try {
        console.log(req.body);
        const userlist = await User.find({
            email:{
                $eq: (req.body.email)
            },
        });
        console.log(userlist)
        res.send(userlist)
    } catch (err) {
        console.log("Server Error");
        res.status(500).send("Server Error");
    }
}

exports.createUser = async (req,res) => {
    try {
        res.send(await new User(req.body).save())
        console.log(req.body)
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
    }
}