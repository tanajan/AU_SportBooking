const { events } = require('../models/Booking');
const Booking = require('../models/Booking');

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
        console.log(req.body.mm)
        const currentM = await Booking.find({
            "$expr": {
                "$eq":[{
                    "$month":"$start"
                },req.body.mm]
            }
        }).sort({start : 1})
        console.log(currentM)
        res.send(currentM)   
    } catch(err) {
        console.log("Server Error")
        res.status(500).send("Server Error!")
    }
}

exports.deleteEvent = async (req,res) => {
    try {
        console.log(req.params)
        res.send(await Booking.findOneAndDelete(
            { _id: req.params.id}
        ))
        res.send('Delete Success!')
    } catch(err) {
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}