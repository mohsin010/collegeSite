let mongoose = require('mongoose');

let vivaSchema = mongoose.Schema({
    groupid: [],
    startDate: String,
    endDate: String,
    vivaDate: String
    
})

let Viva = mongoose.model('viva', vivaSchema);

module.exports = Viva;