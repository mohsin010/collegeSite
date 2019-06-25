let mongoose = require('mongoose');

let resultsSchema = mongoose.Schema({
    rollno: String,
    groupId: String,
    marks: String,
    grade: String
    
})

let Result = mongoose.model('result', resultsSchema);

module.exports = Result;