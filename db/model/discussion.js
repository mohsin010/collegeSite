let mongoose = require('mongoose');

let discussionSchema = mongoose.Schema({
  
    groupid: String,
    supid: String,
    rollno: String,
    msgid: String,
    subject: String,
    body: String,
    posttime: String,
    replytime: String,
    supreply: String
})

let Discussion = mongoose.model('discussion', discussionSchema);

module.exports = Discussion;