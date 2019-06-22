let passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/model/user');



var myStrategy = new LocalStrategy({
    usernameField: 'rollno'
}, function (username, password, next) {

    User.findOne({ rollno: username, password: password }, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(null, false); }
        return next(null, user);

    });




    //userFound ? (req.user = userFound, next()) : res.json({success:false});

})

passport.use(myStrategy);

module.exports = { User, passport };