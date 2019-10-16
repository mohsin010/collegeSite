let mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/consumerdb'

// Altas String

const MONGODB_URI = 'mongodb+srv://mohsin:12345@cluster0-m7tgs.mongodb.net/collegeDb?retryWrites=true&w=majority'


mongoose.connect( MONGODB_URI , function(err, connection){
    console.log(err||connection);
});

 