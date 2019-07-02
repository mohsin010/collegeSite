let express = require('express');
let User = require('./db/model/user');
let Faculty = require('./db/model/faculty');
let Admin = require('./db/model/admin');
let bd = require('body-parser');
let userRoutes = require('./routes/user');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');


require('./db/config')

let app = express();

app.use(bd.json());
app.use(bd.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(expressSession({
    secret: 'This is my sercert',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, next) {

    next(null, user.cnic)

}); 

let users = require('./authentication').users;


passport.deserializeUser(function (cnic, next) {

    let userFound = null

    User.findOne({ cnic: cnic }, function (err, user) {
        if (!user) {
            Faculty.findOne({ cnic: cnic }, function (err, user) {
                if (!user) {
                    Admin.findOne({ cnic: cnic }, function (err, user) {
                        return next(err, user);

                    })
                } else {

                    return next(err, user);
                }

            });
        } else {

            next(err, user);
        }

    });






});



app.use('/', userRoutes);





// app.post('/login', function (req, res) {


//         User.findOne({ rollno: req.body.rollno, password: req.body.password }, (err, user) => {
//             res.json(err || user || {})
//         })


// });

// app.post('/signup', function (req, res) {

//     let newUser = new User(req.body);
//     newUser.save((err, user) => {
//         res.json(err || user);
//     })

// })
// app.post('logout', function(req, res){
//     res.redirect('/')
// }
// )

// app.get('/', function (req, res) {
//     res.end('Hellow bhai log');
// })



app.listen(8080, () => console.log('Server Running at:http://localhost:8080'));