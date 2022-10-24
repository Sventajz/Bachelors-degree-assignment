const mongoose = require('mongoose');


const carSchema = mongoose.Schema({
    carName:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('garage',carSchema);