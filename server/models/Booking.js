const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    title:{
        type: String
    },
    par1:{
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
    }
},{ timestamp: true})

module.exports = Booking = mongoose.model('bookings',bookingSchema)