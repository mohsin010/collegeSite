let mongoose = require('mongoose');

let contactsSchema = mongoose.Schema({
  
    issue: String,
    email: String,
    num: String
   
})

let Contacts = mongoose.model('contacts', contactsSchema);

module.exports = Contacts;