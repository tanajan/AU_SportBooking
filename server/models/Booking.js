const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    requester:{
        type: String
    },
    par1:{
        type: String
    },
    par2:{
        type: String
    },
    par3:{
        type: String
    },
    par4:{
        type: String
    },
    par5:{
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    sportType:{
        type: String
    },
    courtNum: {
        type: String
    },
    title: {
        type: String
    },
    apprstatus: {
        type: Boolean
    }
},{ timestamp: true})

module.exports = Booking = mongoose.model('bookings',bookingSchema)