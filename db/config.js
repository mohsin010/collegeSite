let mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/consumerdb'
const MONGODB_URI = 'mongodb+srv://mohsin:MD005090509@cluster0-m7tgs.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect( MONGODB_URI , function(err, connection){
    console.log(err||connection);
});

 