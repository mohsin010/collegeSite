let mongoose = require('mongoose');

let vivaSchema = mongoose.Schema({
    groupid: [],
    startDate: String,
    endDate: String,
    vivaDate: String,
    display1: Boolean,
    display2: Boolean
    
})

let Viva = mongoose.model('viva', vivaSchema);

module.exports = Viva;