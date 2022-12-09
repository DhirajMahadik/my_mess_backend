const mongoose = require('mongoose');

const Connect = async () => {
    await mongoose.connect('mongodb+srv://dhirajmobicloud:Mobi%40123@cluster0.u1kcqe0.mongodb.net/messes')
}



module.exports = Connect
