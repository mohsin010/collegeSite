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
    g_id: String,
    
});
  


let User = mongoose.model('users', userSchema); 

module.exports = User;