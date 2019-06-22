let express = require('express')
let router = express.Router();
let userController = require('../controllers/user');
let authentication = require('../authentication');
let passport = require('passport')
let User = require('../db/model/user');
let Faculty = require('../db/model/faculty');
let Assignments = require('../db/model/assignments');
const multer = require('multer');
let path = require('path');
let crypto = require('crypto');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
      
            cb(null, file.originalname )
          })
        // cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })




// AllStoreRoutes.post('/new', upload.single('file'), function (req, res, next) {
//     if (req.file) {
//         req.body.file = req.file.path;
//     } else {

//     }



// })



router.get('/is_authenticated', function (req, res) {
    res.json(req.user || {});
});



router.post('/assignments', upload.single('file'), function (req, res) {
    if (req.file) {
        req.body.file = req.file.path;
    }
    Assignments.findOneAndUpdate({ rollno: req.body.rollno }, req.body, (err, rec) => {
        if (rec) {
            res.json(err || rec);
        } else {
            let newAssignment = new Assignments(req.body);
            newAssignment.save((err, rec) => {
                res.json(err || rec);
            })
        }

    })
})
router.post('/assignment_display', function (req, res) {
    Assignments.findOne({ rollno: req.body.rollno }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/update_profile', function (req, res) {
    User.findOneAndUpdate({ rollno: req.body.rollno }, req.body, (err, user) => {
        if (user) {
            res.json(user);
        }
        if (err) {
            console.log('an Error is occurd');
        }
    })
})


router.post('/login', function (req, res, next) {


    passport.authenticate('local', function (err, resp) {


        if (resp) {
            req.login(resp, () => {
                res.json(resp);
            });

        } else {
            res.json({ success: false })
        }

        // if (resp) {
        //     console.log('Usr and err is Null')
        // } else {

        //     res.json(req.user || {});
        // }
        // if()

    })(req, res, next);



})


router.post('/fsignup', function (req, res) {

    Faculty.findOne({ rollno: req.body.rollno }, (err, user) => {

        if (user) {
            res.json(user);
        } else {

            let newUser = new User(req.body);
            newUser.save((err, user) => {
                res.json(err || { success: true });
            })
        }

    })


})

// router.post('/login', function (req, res) {


//     User.findOne({ rollno: req.body.rollno, password: req.body.password }, (err, user) => {
//         res.json(err || user || {})
//     })


// });

router.post('/signup', function (req, res) {

    User.findOne({ rollno: req.body.rollno }, (err, user) => {

        if (user) {
            res.json(user);
        } else {

            let newUser = new User(req.body);
            newUser.save((err, user) => {
                res.json(err || { success: true });
            })
        }

    })


})

router.post('/logout', function (req, res) {
    req.logout();
    res.json({ success: true });
    logggedIn = null;
    // res.redirect('/');
}
)



module.exports = router; 