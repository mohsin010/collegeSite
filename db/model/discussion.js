let mongoose = require('mongoose');

let discussionSchema = mongoose.Schema({
  
    groupid: String,
    supervisorname: String,
    // rollno: String,
    msgid: String,
    subject: String,
    body: String,
    posttime: String,
    replytime: String,
    supreply: String,
    to: String
})

let Discussion = mongoose.model('discussion', discussionSchema);

module.exports = Discussion;