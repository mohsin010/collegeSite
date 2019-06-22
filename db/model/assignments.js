let mongoose = require('mongoose');

let assignmentsSchema = mongoose.Schema({
    no: String,
    topic: String,
    due_date: String,
    title: String,
    rollno: String,
    file: String,
    total_marks: String,
    obtain_marks: String
})

let Assignments = mongoose.model('assignments', assignmentsSchema);

module.exports = Assignments;