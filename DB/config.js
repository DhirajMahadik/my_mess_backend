//// Required modules and libraries
const mongoose = require('mongoose');

// configuration of backend with database
const Connect = () => {

    return mongoose.connect('mongodb://127.0.0.1:27017/')

}

module.exports = Connect
