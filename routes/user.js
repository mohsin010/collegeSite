let express = require('express')
let router = express.Router();
let userController = require('../controllers/user');
let authentication = require('../authentication');
let passport = require('passport')
let User = require('../db/model/user');
let Faculty = require('../db/model/faculty');
let Assignments = require('../db/model/assignments');
let Documents = require('../db/model/document');
let Result = require('../db/model/result');
let Admin = require('../db/model/admin');
let Notic = require('../db/model/notic'); 
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

router.post('/notic', function (req, res) {

    Notic.findOne( {title: req.body.title}, req.body, (err, rec) => {
            if(rec){
                res.json({success:false})
            }else{

                let newAssignment = new Notic(req.body);
                newAssignment.save((err, rec) => {
                    res.json(err || rec);
                })
            }
    })
})

router.post('/notic_display', function (req, res) {
    Notic.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/sup_notic_display', function (req, res) {
    Notic.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_notic', function (req, res) {

    Notic.findOneAndDelete({ title: req.body.linkadress}, req.body , (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            // res.json({success : false})
            console.log('Notic Not Found');
        }
    })
})


router.post('/result', function (req, res) {

    Result.findOne( {rollno: req.body.rollno}, req.body, (err, rec) => {
            if(rec){
                res.json({success:false})
            }else{

                let newAssignment = new Result(req.body);
                newAssignment.save((err, rec) => {
                    res.json(err || rec);
                })
            }
    })
})
router.post('/result_display', function (req, res) {
    Result.find({ rollno: req.body.rollno }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/sup_result_display', function (req, res) {
    Result.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_marks', function (req, res) {

    Result.findOneAndDelete({ rollno: req.body.rollno}, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('Marks not Found');
        }
    })
})

router.post('/documents', upload.single('file'), (req, res) => {
    if (req.file) {
        req.body.file = req.file.path;
    }
    Documents.find( req.body, (err, rec) => {

        let newAssignment = new Documents(req.body);
        newAssignment.save((err, rec) => {
            res.json(err || rec);
        })

    })
})



router.post('/document_display', function (req, res) {
    Documents.find( (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/sup_document_display', function (req, res) {
    Documents.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_document', function (req, res) {

    Documents.findOneAndDelete({ linkadress: req.body.linkadress}, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})


router.post('/assignments', upload.single('file'), (req, res) => {
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
            if(!user){
                Admin.findOneAndUpdate({cnic: req.body.cnic }, req.body , (err,user) => {

                    res.json(user);
                })

            }else{

                res.json(user);
            }
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