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
let Announcement = require('../db/model/announcement');
let Discussion = require('../db/model/discussion');
let Contacts = require('../db/model/contacts');
let Groups = require('../db/model/group');
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
// <======================================== Supervisor Info Show below ===========================================>

router.post('/st_supervisor_info', function (req, res) {
    Groups.findOne({st_group: req.body.rollno}, (err, rec) =>{

        Faculty.findOne({ name: rec.supervisor }, (err, rec) => {
    
            res.json(err || rec || { rec: "false" });
        })
    })
})

router.post('/sup_supervisor_info', function (req, res) {
    Faculty.findOne({ cnic: req.body.cnic }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})



// <======================================== Create Groups below ===========================================>


router.post('/get_students', function (req, res) {
    User.find((err, rec) => {
        res.json(err || rec)
    })
    // Groups.aggregate([{$unwind: '$st_group'}], (err, rec)=>{
    //     if(rec){
    //         for(let i= 0; i < rec.length; i++){
    //             User.findOneAndUpdate({rollno:rec[i].st_group}, ({groupid:rec[i].groupid }), (err, rec) => {

    //                 console.log(rec);
    //                 // res.json(err || rec || { rec: "false" });
    //             })

    //         }
    //     }
    // })

})

router.post('/get_supervisors', function (req, res) {
    Faculty.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/add_group', function (req, res) {
    // User.findOneAndUpdate({rollno: req.body.st_group}, req.body.groupid, (err, rec) => {

    // })
    Groups.findOne({ groupid: req.body.groupid }, req.body, (err, rec) => {
        if (rec) {
            res.json({ success: false })
        } else {

            let newgroup = new Groups(req.body);
            newgroup.save((err, rec) => {
                res.json(err || rec || { success: true });
            })

        }

    })
})

router.post('/groups_display', function (req, res) {
    Groups.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/st_groups_display', function (req, res) {
    Groups.findOne({ st_group: req.body.rollno }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_group', function (req, res) {

    Groups.findOneAndDelete({ groupid: req.body.groupid }, req.body, (err, rec) => {

        User.updateMany({ groupid: req.body.groupid }, { groupid: "" }, function (err, users) {

            if (users) {
                res.json(users)
            } else {
                // res.json({success : false})
                console.log('Contact Not Found');
            }


        })


    })
})





// <======================================== Contacts below ===========================================>

router.post('/contact', function (req, res) {
    Contacts.find(req.body, (err, rec) => {


        let newcontact = new Contacts(req.body);
        newcontact.save((err, rec) => {
            res.json(err || rec);
        })
    })
})

router.post('/contacts_display', function (req, res) {
    Contacts.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

// delete contact
router.post('/delete_contact', function (req, res) {

    Contacts.findOneAndDelete({ issue: req.body.issue }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            // res.json({success : false})
            console.log('Contact Not Found');
        }
    })
})

// <===================== Discussions ========================>
//  Student Message

router.post('/post_msg', function (req, res) {
    Discussion.find(req.body, (err, rec) => {


        let newMsg = new Discussion(req.body);
        newMsg.save((err, rec) => {
            res.json(err || rec);
        })
    })
})

// supervisor reply

router.post('/sup_post_msg', function (req, res) {
    Discussion.findOneAndUpdate({ msgid: req.body.msgid }, req.body, (err, rec) => {


        res.json(err || rec);
    })
})


router.post('/msg_display', function (req, res) {
    Discussion.find({ groupid: req.body.groupid }, (err, rec) => {
        if(rec != []){

             res.json(err || rec || { rec: "false" });
        }else{
            console.log('no discussion')
        }


    })
})
router.post('/sup_msg_display', function (req, res) {
    Discussion.find({ supervisorname: req.body.supervisorname }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})
router.post('/admin_msg_display', function (req, res) {
    Discussion.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

// delete Message
router.post('/delete_message', function (req, res) {

    Discussion.findOneAndDelete({ msgid: req.body.msgid }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            // res.json({success : false})
            console.log('Message Not Found');
        }
    })
})




// <======================================== Announcement below ===========================================>

router.post('/announcement', function (req, res) {

    Announcement.findOne({ title: req.body.title }, req.body, (err, rec) => {
        if (rec) {
            res.json({ success: false })
        } else {

            let newAssignment = new Announcement(req.body);
            newAssignment.save((err, rec) => {
                res.json(err || rec);
            })
        }
    })
})

router.post('/announcement_display', function (req, res) {
    Groups.findOne({ st_group: req.body.rollno }, (err, rec) => {
        if (rec) {
            Announcement.find({ groupid: rec.groupid }, (err, rec) => {
                res.json(err || rec || { rec: "false" });
            })
        }
    })

})
router.post('/sup_announcement_display', function (req, res) {
    Groups.findOne({ supervisor: req.body.name }, (err, rec) => {
        if (rec) {
            Announcement.find({ groupid: rec.groupid }, (err, rec) => {
                res.json(err || rec || { rec: "false" });
            })
        }
    })

})

router.post('/admin_announcement_display', function (req, res) {
    Announcement.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_announcement', function (req, res) {

    Announcement.findOneAndDelete({ title: req.body.linkadress }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            // res.json({success : false})
            console.log('Announcement Not Found');
        }
    })
})


// below noticeboard 
router.post('/notic', function (req, res) {

    Notic.findOne({ title: req.body.title }, req.body, (err, rec) => {
        if (rec) {
            res.json({ success: false })
        } else {

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

    Notic.findOneAndDelete({ title: req.body.linkadress }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            // res.json({success : false})
            console.log('Notic Not Found');
        }
    })
})


router.post('/result', function (req, res) {

    Result.findOne({ rollno: req.body.rollno }, req.body, (err, rec) => {
        if (rec) {
            res.json({ success: false })
        } else {

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

    Result.findOneAndDelete({ rollno: req.body.rollno }, req.body, (err, rec) => {

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
    Documents.findOne(req.body, (err, rec) => {

        let newAssignment = new Documents(req.body);
        newAssignment.save((err, rec) => {
            res.json(err || rec);
        })

    })
})



router.post('/document_display', function (req, res) {
    Documents.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/sup_document_display', function (req, res) {
    Documents.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/delete_document', function (req, res) {

    Documents.findOneAndDelete({ linkadress: req.body.linkadress }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})

// Assignments section from here

router.post('/assignments', upload.single('file'), (req, res) => {
    if (req.file) {
        req.body.file = req.file.path;
    }
    Assignments.findOne({ groupid: req.body.groupid, no: req.body.no }, req.body, (err, rec) => {
        if (rec) {
            res.json({ success: false })
        } else {

            let newAssignment = new Assignments(req.body);
            newAssignment.save((err, rec) => {
                res.json(err || rec);
            })
        }

    })
})
router.post('/assignments_marks', function (req, res) {

    Assignments.findOneAndUpdate({ groupid: req.body.groupid, no: req.body.no }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})

router.post('/submit_assignment', upload.single('file'), (req, res) => {
    if (req.file) {
        req.body.subfile = req.file.path;
    }
    Assignments.findOneAndUpdate({ groupid: req.body.b, no: req.body.a }, req.body, (err, rec) => {

        if (!rec) {
            res.json({ success: false })
        } else if (rec) {
            res.json({ success: true })
        } else {
            console.log('an Error is occurd');
        }
    })
})

router.post('/delete_assignment', function (req, res) {

    Assignments.findOneAndDelete({ groupid: req.body.groupid, no: req.body.no }, req.body, (err, rec) => {

        if (rec) {
            res.json(rec)
        } else {
            console.log('an Error is occurd');
        }
    })
})
router.post('/assignment_display', function (req, res) {
    Groups.findOne({ st_group: req.body.rollno }, (err, rec) => {

        if (rec) {


            Assignments.find({ groupid: rec.groupid }, (err, rec) => {

                res.json(err || rec || { rec: "false" });
            })

        } else {
            console.log('Group Not Found')
        }


    })



})

router.post('/sup_assignment_display', function (req, res) {
    Groups.findOne({ supervisor: req.body.name }, (req, rec) => {
        if (rec) {

            Assignments.find({ groupid: rec.groupid }, (err, rec) => {

                res.json(err || rec || { rec: "false" });
            })
        }

    })


})
router.post('/admin_assignment_display', function (req, res) {
    Assignments.find((err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})

router.post('/sup_groups_display', function (req, res) {
    Groups.find({ supervisor: req.body.supervisorname }, (err, rec) => {

        res.json(err || rec || { rec: "false" });
    })
})
router.post('/groups_progress_update', function (req, res) {

    Groups.findOneAndUpdate({ groupid: req.body.groupid }, (req.body), (err, rec) => {
        Groups.findOne({groupid: req.body.groupid}, (req, rec) =>{

            res.json(err || rec || { rec: "false" });
        })

    })
})
router.post('/admin_groups_display', function (req, res) {
    Groups.find((err, rec) => {

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
            Faculty.findOneAndUpdate({ cnic: req.body.cnic }, req.body, (err, user) => {
                if (!user) {
                    Admin.findOneAndUpdate({ cnic: req.body.cnic }, req.body, (err, user) => {

                        res.json(user);
                    })

                } else {

                    res.json(user);
                }
            })
        } else {
            res.json(user);

        }
        if (err) {
            console.log('an Error is occurd');
        }
    })
})
// <========================================  Update User ===========================================>

router.post('/update_user_group', function (req, res) {

    // Groups.update({ $pull: { $st_group } })


    Groups.aggregate([{ $unwind: '$st_group' }], (err, rec) => {
        if (rec) {
            for (let i = 0; i < rec.length; i++) {
                User.findOneAndUpdate({ rollno: rec[i].st_group }, ({ groupid: rec[i].groupid }), (err, rec) => {

                    // console.log(rec);
                    // res.json({ success: true });
                })

            }
        }
    })

    // Groups.findOne({st_group:req.body.rollno}, (err, rec)=>{
    //     if(rec){
    //     User.findOneAndUpdate({rollno: req.body.rollno}, {groupid:rec.groupid}, (err, rec) =>{
    //         res.json(err || rec);
    //     })
    // }

    // })
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
router.post('/sup_signup', upload.single('file'), (req, res) => {
    if (req.file) {
        req.body.file = req.file.path;
    }
    Faculty.findOne({ cnic: req.body.cnic }, req.body, (err, user) => {

        if (user) {
            res.json(user);
        } else {
            let newMember = new Faculty(req.body);
            newMember.save((err, rec) => {
                res.json(err || { success: true });
            })
        }

    })
})

// router.post('/sup_signup', function (req, res) {

//     Faculty.findOne({ cnic: req.body.cnic }, (err, user) => {

//         if (user) {
//             res.json(user);
//         } else {

//             let newMember = new Faculty(req.body);
//             newMember.save((err, user) => {
//             })
//         }

//     })


// })

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

// router.get('/sup_assignment_display',  function (req, res)  {

//     function search(req,res) {
//         var groupid = []
//         var stgroup;
//         Groups.find().then(group => {
//             groupid = [...groupid, group.groupid]
//             stgroup = group.st_group
//         })
//     }
//     search();
// })



module.exports = router; 