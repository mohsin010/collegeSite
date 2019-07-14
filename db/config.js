let mongoose = require('mongoose');

const url = process.env.MONGODB_URI/consumerdb || 'mongodb://127.0.0.1:27017/consumerdb'

mongoose.connect( url, function(err, connection){
    console.log(err||connection);
});

 