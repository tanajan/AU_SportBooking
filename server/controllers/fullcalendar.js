const Booking = require('../models/Booking');
const User = require("../models/User");
const {notifyBooking} = require('../function/notify')
const cron = require('node-cron')
const moment = require('moment');
const { notify } = require('../routes/fullcalendar');

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

exports.chartEvent = async(req,res)=> {
    try {
        console.log(req.body);
        const monbookings = await Booking.find({
            start:{
                $gte: new Date (req.body.startdate.stdate),
                $lte: new Date (req.body.enddate.enddate)
            },
        }); 
        res.send(monbookings)
    } catch(err) {
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
        console.log(res.body)
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


 exports.currentday = async(req,res)=> {
    try {
        const d = new Date();
        const currentD = await Booking.find({}).sort({start : 1})
        const current = currentD.filter(item=>{
            return d.getFullYear() === item.start.getFullYear() && d.getMonth() === item.start.getMonth() && d.getDate() === item.start.getDate()
        })
        console.log(current)
        for(t in current) {
            const msg = "Bookings"+ current[t].sportType
            notifyBooking(msg)
        }
    } catch(err) {
        console.log("Server Error")
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

exports.createUser = async (req,res) => {
    try {
        res.send(await new User(req.body).save())
        console.log(req.body)
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
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

exports.getuserAbacID = async(req,res)=> {
    try {
        console.log(req.body);
        console.log("1")
        const userlist = await User.find({
            googleId:{
                $eq: (req.body.gId)
            },
        });
        console.log("2")
        console.log(userlist)
        res.send(userlist)
    } catch (err) {
        console.log("Server Error");
        res.status(500).send("Server Error");
    }
}

// cron.schedule('43 8 * * *', () => {
//     currentday()
// });