let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohsin:<password>@cluster0-m7tgs.mongodb.net/test?retryWrites=true&w=majority', function(err, connection){
    console.log(err||connection);
});

  