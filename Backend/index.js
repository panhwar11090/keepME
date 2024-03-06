const express = require("express")
const mongoose = require('mongoose')
// const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")






// const connection = require("./db")
// const KeepmeModel = require("./models/user")

dotenv.config()
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET, POST,PUT,DELETE', // Allow only GET and POST requests
    allowedHeaders: 'Content-Type,Authorization', // Allow only specified headers
};

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use("/files", express.static("files"));

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));


const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname )
    }
  })

//   console.log('storage', storage)


  require("./models/pdfDetails");
  const PdfSchema = mongoose.model("PdfDetails");  
  require("./models/imageDetails")
  const Images = mongoose.model("ImageDetails")
  const upload = multer({ storage: storage })
//   console.log('upload', upload)

app.post('/upload-files', upload.single("file"), async(req,res)=>{
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await PdfSchema.create({title:title , pdf : fileName});
        res.send({status:"ok"});
    } catch (error) {
        res.json({status:error})
    }
})

app.get('/get-files', async (req,res)=>{
    try {
        PdfSchema.find({}).then((data)=>{
            res.send({status:"ok", data:data})
        })
        
    } catch (error) {
        res.json({status: error})
    }
})

app.post('/multi-files', upload.any(), async(req,res)=>{
    console.log(req.file);
    const titles = req.body.title;
    // const fileName = req.file.filename;
    console.log(req.file)
    try {
        const filesData = req.files.map((file, index)=>{
            return{
                title:titles[index],
                pdf:file.filename
            }
        })
        await PdfSchema.create(filesData);
        res.send({status:"ok"});
        console.log("filesData",filesData)
    } catch (error) {
        res.json({status:error})
    }
})







const storageForUploads = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads') // Destination path for uploads
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname )
    }
})

const uploadForUploads = multer({ storage: storageForUploads })


app.post("/upload-image", upload.single("image"),async (req,res) =>{
    console.log(req.body)
    const iamgeName = req.file.filename;
    try {
        await Images.create({image:iamgeName})
        res.json({status:"ok"})
        
    } catch (error) {
        res.json({status: error})
    }
})

app.post("/multi-image", upload.any(),async (req,res) =>{
    
    try {
        const imageNames = req.files.map(file=> file.filename);
        await Promise.all(imageNames.map(imageName=> Images.create({image:imageName}) ))
        
        res.json({status:"ok"})
        
    } catch (error) {
        res.json({status: error})
    }
})


app.get("/get-image", async (req,res)=>{
    try {
        Images.find({}).then((data)=>{
            res.send({status:"ok", data: data})
        })
        
    } catch (error) {
        res.json({status: error});
    }
})



const PORT =process.env.PORT || 3001;

// mongoose.connect('mongodb://127.0.0.1:27017/keepme', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
//database connection
// connection();

// app.post('/login', (req, res) => {
//     const {email, password} = req.body;
//     KeepmeModel.findOne({email, password})
//     .then(user=>{
//         if(user){
//             if(user.password === password){
//                 res.json("Login Successful")
//             }else{
//                 res.json( "Password is incorrect")
//             }
//         }else{
//             res.json("no record exist")
//         }
//     })
// })

// app.post('/signup', (req, res) => {
//     KeepmeModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })




app.use("/users",userRouter);
app.use("/note", noteRouter);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err);
})  
