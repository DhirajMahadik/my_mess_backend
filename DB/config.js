//// Required modules and libraries
const mongoose = require('mongoose');

// configuration of backend with database
const Connect = () => {

    return mongoose.connect('mongodb+srv://dhirajmobicloud:Mobi%40123@cluster0.u1kcqe0.mongodb.net/messes')

}

module.exports = Connect
