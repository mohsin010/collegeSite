let mongoose = require('mongoose');

let documentsSchema = mongoose.Schema({
  
    linkadress: String,
    time: String,
    file: String,
    
})

let Documents = mongoose.model('documents', documentsSchema);

module.exports = Documents;