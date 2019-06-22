let User = require('../db/model/user');

let user = {
    signup: function (body, callback) {

        User.find()

        let newUser = new User(body);        
        newUser.save(callback);

    }
};
 

module.exports = user;