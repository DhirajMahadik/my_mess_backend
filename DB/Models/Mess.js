//// Required modules and libraries
const mongoose = require('mongoose')


// creating schema for user details
const MessSchema = new mongoose.Schema(
    {
        messname: String,
        type: String,
        open : String,
        close : String,
        location : String,
        phone : String,
        address : String,
        image: String,
        email:String,
        password:String
    }
);

// MessSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, 10,(err,encrypted)=> {
//         console.log(encrypted);
//     });
//     console.log(`password is  ${this.password}`)
//     next()
// })

module.exports = mongoose.model('Mess', MessSchema)