//// Required modules and libraries
const mongoose = require('mongoose');
// const URL = process.env.DATABASE
// configuration of backend with database
const Connect = () => {
    // console.log(process.env.DATABASE)
    return mongoose.connect(`mongodb+srv://${process.env.DATABASE}/test`)
    // return mongoose.connect(process.env.DATABASE)
   

}

module.exports = Connect
