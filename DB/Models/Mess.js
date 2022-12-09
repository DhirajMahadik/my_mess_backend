const mongoose = require('mongoose')

const MessSchema = new mongoose.Schema(
    {
        messname: String,
        type: String,
        open : String,
        close : String,
        photo : String,
        location : String,
        phone : Number,
        address : String,
        banner: String
    }
);

module.exports = mongoose.model('Mess', MessSchema)