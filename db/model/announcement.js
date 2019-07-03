let mongoose = require('mongoose');

let AnnouncementSchema = mongoose.Schema({
    title: String,
    body: String,
    groupid: String,
    time: String
    
})

let Announcement = mongoose.model('announcement', AnnouncementSchema);

module.exports = Announcement;