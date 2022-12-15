const express = require('express')
const Connect = require('./DB/config')
const multer = require('multer')
const Mess = require('./DB/Models/Mess')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
            cb(null, 'Images/')
    },
    filename:(req, file, cb)=>{
        cb(null,   "dhiraj" + file.originalname)
    }
})

const UpdatePath = (email)=>{
   
}

const upload = multer({storage:storage});
const app = express();
app.use(express.json())
app.use('/imgs', express.static('./Images'))
app.use(cors())

app.get('/', async (req,res)=>{
    let data = await Mess.find();
    res.send(data)
})

app.post('/add-mess',upload.single('image'), async(req, res)=>{
    const email = req.body.email;
    // let data0= await Mess.findOne({email:email});
    // if(!data0){
    //     console.log(req.body)
    //     console.log(req.file)
    //     let data = new Mess(req.body);
    //     let result = await data.save();
    //     res.send(result)
    // }
    // else{
    //     res.status(400).send("Email Already exist")
    // }
    
    Mess.findOne({email:email}).then((response)=>{
        
        if(!response){
                console.log(req.body)
                console.log(req.file)
                let data = new Mess(req.body);
                let result = data.save();
                res.send(result)
                Mess.updateOne({email:email},{$set:{image:req.file.path}})
            }
            else{
                res.status(400).send("Email Already exist")
            }
       
    }).then(()=>{
        
    })
    
    
})



app.get('/mess/:id', async (req,res)=>{

    let data = await Mess.findOne({_id:req.params.id})
    if(data){
        res.send(data)
    }
    else{
        res.send("No data found")
    }
})

app.get('/search/:key', async (req, res)=>{
    let data = await Mess.find({
        "$or":[
            {"messname":{$regex:req.params.key}},
            {"address":{$regex:req.params.key}},
        ]
    })

    res.send(data)
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    // console.log(req.body)
    let data = await Mess.findOne({email:email})
    console.log(data)
    if(data){
       
        res.status(200).send(data)
        // console.log(data)
    }
    else{
        res.status(400).send('bad request')
    }
  })


Connect().then(() => {
    app.listen(process.env.PORT || 5000, ()=>{
        console.log("app is running")
    });
}).catch((err) => {
    console.log(err);
})
