//// Required modules and libraries
const mongoose = require('mongoose');
// const URL = process.env.DATABASE
// configuration of backend with database
const Connect = () => {

    // return mongoose.connect('mongodb+srv://dhirajdemo9221:dhirajdemo%40123@cluster0.10xjk3l.mongodb.net/test')
    return mongoose.connect(process.env.DATABASE)

}

module.exports = Connect
