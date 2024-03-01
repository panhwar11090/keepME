const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config();
const connection = require("./db")
const KeepmeModel = require("./models/user")


const app = express()

//middleware
app.use(express.json())
app.use(cors())

const PORT = 3001;

// mongoose.connect('mongodb://127.0.0.1:27017/keepme', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
//database connection
connection();

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


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})