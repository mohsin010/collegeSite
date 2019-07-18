let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    fname: String,
    email: String,
    phone: String,
    password: String,
    program: String,
    rollno: String,
    department: String,
    startdate: String,
    enddate: String,
    groupid: String,
    vivaid: String,
    supervisorname: String,
    cnic: String
});
  


let User = mongoose.model('users', userSchema); 

module.exports = User;