let mongoose = require('mongoose');

let groupSchema = mongoose.Schema({

    st_group: [],
    supervisor: String,
    groupid: String,
    no: String,
    title: String

})

let Group = mongoose.model('groups', groupSchema);

module.exports = Group;