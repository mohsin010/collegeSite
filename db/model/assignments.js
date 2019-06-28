let mongoose = require('mongoose');

let assignmentsSchema = mongoose.Schema({
    no: String,
    topic: String,
    due_date: String,
    title: String,
    groupid: String,
    file: String,
    subfile: String,
    total_marks: String,
    obtain_marks: String,
    display3: Boolean,
    display4: Boolean,
    date:''

})

let Assignments = mongoose.model('assignments', assignmentsSchema);

module.exports = Assignments;