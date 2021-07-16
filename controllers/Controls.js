const Examiner = require('../models/Examiner');
const Students = require('../models/student')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const bcrypt = require('bcrypt');

exports.signUpUser = async (req, res, next) => {
    try {
        const { email, password, passwordConfirm, staffId, role } = req.body;
        if (role == "Examiner") {
            const examiner = await Examiner.create({
                email,
                password,
                passwordConfirm,
                staffId,
                role
            })
            console.log(examiner)
            await examiner.save(examiner, (err, examiner) => {
                if (err) {
                    res.send(err)

                    console.log(err)
                }
                else {
                    res.status(201).json({
                        success: true,
                        messsage: 'Examiner registered successfully'
                    })
                    console.log('success')
                    // res.redirect("/examiner/login")
                }
            })
        }
        else if (role == "student") {
            const { firstName, lastName, matricNumber, faculty, department, level, email, password, passwordConfirm, role } = req.body;
            console.log(req.body)

            const student = await Students.create({
                firstName,
                lastName,
                matricNumber,
                faculty,
                department,
                level,
                email,
                password,
                passwordConfirm,
                role
            })
            console.log(student)
            await student.save(student, (err, student) => {
                if (err) {
                    res.send(err)
                    console.log(err)
                }
                else {
                    res.status(201).json({
                        success: true,
                        messsage: 'Student created successfully'
                    })
                    console.log('success')
                    // res.redirect("/student/login")
                }
            })
        }
    } catch (err) {
        next(err)
    }
}

//Examiner LOGIN
exports.signInExaminer = function (req, res, next) {
    const { email, password } = req.body
    //find user exist or not
    Examiner.findOne({email}).then(examiner=> {
        if (examiner){
            examiner.comparePassword(password)
            .then(isMatch=>{
                 if(isMatch){
                    res.locals.redirect('/examiner/home')
                    res.locals.examiner = Examiner;
                }
                else{
                    // req.flash("error", "Failed to log in user account:
                    // Incorrect Password.");
                    res.send('passwords mismatch')
                    // res.locals.redirect('/examiner/login')
                    
                }
                next()
            })
        }
        else{
            res.send('failed to log in: Examiner credentials not found')
            next()
        }
    }).catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
}
    

//STUDENT LOGIN
exports.signInStudent = function (req, res, next) {
    const { email, password } = req.body
    //find user exist or not
    Examiner.findOne({email}).then(student=> {
        if (student){
            student.comparePassword(password)
            .then(isMatch=>{
                 if(isMatch){
                    res.locals.redirect('/student/home')
                    res.locals.student = Students;
                }
                else{
                    // req.flash("error", "Failed to log in user account:
                    // Incorrect Password.");
                    res.send('passwords mismatch')
                    // res.locals.redirect('/student/login')
                    
                }
                next()
            })
        }
        else{
            res.send('failed to log in: student credentials not found')
            next()
        }
    }).catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
}
exports.logoutUser = function (req, res) {
    req.logout();
    res.redirect("/");
}
