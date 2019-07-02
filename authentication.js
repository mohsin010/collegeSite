let passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/model/user');
var Faculty = require('./db/model/faculty');
var Admin = require('./db/model/admin');



var myStrategy = new LocalStrategy({
    usernameField: 'cnic'
}, function (username, password, next) {
 
    User.findOne({ cnic: username, password: password }, function (err, user) {


        if (!user) {
            Faculty.findOne({ cnic: username, password: password }, function (err, user) {
                if (!user) {
                    Admin.findOne({ cnic: username, password: password }, function (err, user) {

                        if (err) { return next(err); }
                        if (!user) { return next(null, false); }
                        return next(null, user);

                    })
                } else {
                    if (err) { return next(err); }
                    if (!user) { return next(null, false); }
                    return next(null, user);
                }
            })
        }else {

            if (err) { return next(err); }
            if (!user) { return next(null, false); }
            return next(null, user);
        }


    });




    //userFound ? (req.user = userFound, next()) : res.json({success:false});

})

passport.use(myStrategy);

module.exports = { User, passport };