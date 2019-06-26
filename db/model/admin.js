let mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
    name: String,
    password: String,
    cnic: String
});
  


let Admin = mongoose.model('admin', adminSchema); 

module.exports = Admin;