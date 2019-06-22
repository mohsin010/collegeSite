let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/consumerdb', function(err, connection){
    console.log(err||connection);
});

 