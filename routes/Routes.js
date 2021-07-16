const express = require ('express');
const router = express.Router();
const {signUpUser, signInExaminer, signInStudent} = require ("../controllers/Controls")
const {connectDB} = require('../db/connectDB')
const passport = require ('passport')


router.get("/", function (req, res){
   return res.json({
        message: 'THIS SHOULD BE THE General Homepage'
    })
})

router.get("/signup", function (req, res){
    res.json({
        message: 'THIS SHOULD BE THE SIGNUP PAGE'
    })
})

router.post("/signup", signUpUser)

router.get("/student/login", function(req, res){
    res.render("studentlogin")
});

router.get("/examiner/login", function(req, res){
    res.render("examinerlogin")
});
router.post('/student/login', signInStudent);

router.post('/examiner/login', signInExaminer);

router.get("/student/home", function(req, res){
  res.send("welcome to the student page")
});

router.get("/examiner/home", function(req, res){
  res.send("welcome to the examiner page")
});

router.get("/student/profile", (req, res)=>{
    res.json(req.Students)
})
router.get("/examiner/profile", (req, res)=>{
    res.json(req.Examiner)
})


module.exports = router;





// "firstName": "kennedy",
// "lastName":"okoro",
// "matricNumber":"2222",
// "faculty":"engineering",
// "department":"electrical",
// "level":"400",
// "email":"kennedyhillary6@gmail.com",
// "password":"99999999",
// "passwordConfirm":"99999999",
// "role":"student"