let express = require('express')
let router = express.Router();
let userController = require('../controllers/user');
let authentication = require('../authentication');
let passport = require('passport')
let User = require('../db/model/user');
let Faculty = require('../db/model/faculty');
let Assignments = require('../db/model/assignments');
let AssignmentsMarks = require('../db/model/assignments_marks');
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
            // cb(null, file.fieldname + '-' + Date.now())
            cb(null, file.originalname + path.extname(file.fieldname))
        })
        // cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })




router.get('/is_authenticated', function (req, res) {
    res.json(req.user || {});
});



router.post('/assignments', upload.single('file'), (req, res) => {
    debugger;
    if (req.file) {
        req.body.file = req.file.path;
    }
    Assignments.find({ rollno: req.body.rollno }, req.body, (err, rec) => {

        let newAssignment = new Assignments(req.body);
        newAssignment.save((err, rec) => {
            res.json(err || rec);
        })

    })
})
router.post('/assignments_marks', function (req, res) {

    Assignments.findOneAndUpdate({ rollno: req.body.rollno, no: req.body.no }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})
router.post('/delete_assignment', function (req, res) {

    Assignments.findOneAndDelete({ rollno: req.body.rollno, no: req.body.no }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})
router.post('/assignment_display', function (req, res) {
    Assignments.find({ rollno: req.body.rollno }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})
router.post('/sup_assignment_display', function (req, res) {
    Assignments.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/supervisor_display', function (req, res) {
    Faculty.find((err, rec) => {

        res.json(err || rec);
    })
})


router.post('/update_profile', function (req, res) {
    User.findOneAndUpdate({ cnic: req.body.cnic }, req.body, (err, user) => {
        if (!user) {
            Faculty.findOneAndUpdate({ cnic: req.body.cnic }, req.body  , (err, user) => {

                res.json(user);
            })
        }else{
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

// Faculty signup

router.post('/sup_signup', function (req, res) {

    Faculty.findOne({ cnic: req.body.cnic }, (err, user) => {

        if (user) {
            res.json(user);
        } else {

            let newMember = new Faculty(req.body);
            newMember.save((err, user) => {
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