const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId:{
        type: String
    },
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