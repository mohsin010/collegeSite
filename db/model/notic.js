let mongoose = require('mongoose');

let NoticSchema = mongoose.Schema({
    title: String,
    body: String,
    time: String
    
})

let Notic = mongoose.model('notic', NoticSchema);

module.exports = Notic;