let mongoose = require('mongoose');

let faculySchema = mongoose.Schema({
    name: String,
    fname: String,
    cnic: String,
    email: String,
    phone: String,
    password: String,
    department: String,
    designation:String,
    description: String,

})

let Faculty = mongoose.model('faculty', faculySchema);

module.exports = Faculty;