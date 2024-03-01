const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const { string} = require('joi')
const passwordComplexity = require("joi-password-complexity")
const Joi = require('joi')

const userSchema= new mongoose.Schema({
    name: {type:string, required: true},
    email: {type:string, required: true},
    password: {type:string, required: true},
        
    
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(({_id:this_id}, process.env.JWTPRIVATEKEY,{expiresin:"7d"}))
    return token
}

const User = mongoose.model("user",userSchema);

const validate = (data)=>{
    const schema = joi.object({
        name:Joi.string().required().label("Name"),
        email:Joi.string().required().label("Email"),
        password:Joi.string().required().label("password"),
    });
    return schema.validate(data)
}

module.exports = {User,validate};