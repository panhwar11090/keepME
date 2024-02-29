const mongoose = require('mongoose')

const KeepmeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
        
    
})

const KeepmeModel = mongoose.model('Keepme', KeepmeSchema)

module.exports = KeepmeModel