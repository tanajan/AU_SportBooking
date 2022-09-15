const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String
    },
    givenName:{
        type: String
    },
    FamilyName: {
        type: String
    },
    imageUrl: {
        type: String
    }
},{ timestamp: true})

module.exports = User = mongoose.model('users',userSchema)