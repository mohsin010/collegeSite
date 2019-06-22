let mongoose = require('mongoose');

let assignmentsMarksSchema = mongoose.Schema({
    no: String,
    rollno: String,
    obtain_marks: String
})

let AssignmentsMarks = mongoose.model('assignments_marks', assignmentsMarksSchema);

module.exports = AssignmentsMarks;