const mongoose = require('mongoose');

const Connect =  () => {
   
    return mongoose.connect('mongodb+srv://dhirajmobicloud:Mobi%40123@cluster0.u1kcqe0.mongodb.net/messes')
//    return mongoose.connect('mongodb+srv://dhirajmobicloud:Mobi%40123@cluster0.u1kcqe0.mongodb.net/messes?retryWrites=true&w=majority')
}



module.exports = Connect
