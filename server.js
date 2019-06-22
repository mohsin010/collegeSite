let express = require('express');
let User = require('./db/model/user');
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

    next(null, user.rollno)

});

let users = require('./authentication').users;


passport.deserializeUser(function (rollno, next) {

    let userFound = null

      User.findOne({ rollno: rollno }, function (err, user) {
        next(err, user);
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