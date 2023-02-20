//// Required modules and libraries
const mongoose = require('mongoose')


// creating schema for user details
const UserSchema = new mongoose.Schema(
    {
        messname: String,
        messtype: String,
        open : String,
        close : String,
        location : String,
        phone : String,
        address : String,
        image: String,
        email:String,
        password:String,
        type:String
    }
);

module.exports = mongoose.model('User', UserSchema)