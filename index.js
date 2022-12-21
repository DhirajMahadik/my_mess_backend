// Required modules and libraries

const express = require('express')
const Connect = require('./DB/config')
const multer = require('multer')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const Mess = require('./DB/Models/Mess')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const app = express();
app.use(express.json())
app.use('/imgs', express.static('./Images'))
app.use(cors())

// Folder creation for user images

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/')
    },
    filename: (req, file, cb) => {
        cb(null, "dhiraj" + file.originalname)
    }
})
const upload = multer({ storage: storage });

// secret key for auth token
const secretKey = "Dhiraj"

//taking auth token from headers
const verify_token =(req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        res.send({result :'invalid token'})
    }else{
        const bearer = bearerHeader.split(" ");
        const token = bearer[1]
        req.token = token
        next();
        
    }
}

//default rout of appliction, it will serve all users details
app.get('/', async (req, res) => {
    let data = await Mess.find();
    res.send(data)
})

// User registration route 
app.post('/add-mess', upload.single('image'), async (req, res) => {
    const email = req.body.email;
    let data0 = await Mess.findOne({ email: email });
    if (!data0) {
        // console.log(req.body)
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.send(err)
            } else {
                let data = new Mess({
                    messname: req.body.messname,
                    type: req.body.type,
                    open: req.body.open,
                    close: req.body.close,
                    location: req.body.location,
                    phone: req.body.phone,
                    address: req.body.address,
                    image: req.file.filename,
                    email: req.body.email,
                    password: hash

                });
                let result = data.save();
                res.send(result)
                console.log(result)
            }
        })

    }
    else {
        res.status(400).send("Email Already exist")
    }
})

// this route will delete a user form database
app.delete('/delete/:id', async (req, res) => {
    let data = await Mess.deleteOne({ _id: req.params.id })
    res.send(data)
})

// this route is created for getting perticular user data
app.get('/mess/:id', async (req, res) => {

    let data = await Mess.findOne({ _id: req.params.id })

    if (data) {
        res.send({messname: data.messname, type:data.type, open:data.open, close:data.close, location:data.location, phone:data.phone, address:data.address, image:data.image, email:data.email})
    }
    else {
        res.send("No data found")
    }
})

// this route is created for perform search operation in user data
app.get('/search/:key', async (req, res) => {
    let data = await Mess.find({
        "$or": [
            { "messname": { $regex: req.params.key } },
            { "address": { $regex: req.params.key } },
        ]
    })

    res.send(data)
})

// User login 
app.post('/login', async (req, res) => {
    const email = req.body.email;
    

    let data = await Mess.find({ email: email, })
    // console.log(data)

   let pass = await bcrypt.compare( req.body.password, data[0].password);
//    console.log(pass)
//    res.send(data._id)

    if (pass) {
       console.log(data[0]._id)
        JWT.sign({ email, _id: data[0]._id }, secretKey, { expiresIn: '900s' }, (err, token) => {
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json({ token })
            }
            
            
        })

    }
    else {
        res.status(400).send('bad request')
    }
})

//profile route 
app.get('/profile', verify_token, (req, res)=>{
    JWT.verify(req.token, secretKey, (err, authData)=>{
        console.log(authData)
        if (err) throw err;
        Mess.findById(mongoose.Types.ObjectId(authData._id)).select('messname type close open location phone address image email').then((messData) => {
            res.send(messData)
        })
        // if(err){
        //     console.log( err)
        // }else{
        //     let user = authData.data
        //     console.log(user)
        //     res.send({messname: user.messname, type:user.type, open:user.open, close:user.close, location:user.location, phone:user.phone, address:user.address, image:user.image, email:user.email})
        // }
    })
})


//Database connection
Connect().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("app is running")
    });
}).catch((err) => {
    console.log(err);
})
