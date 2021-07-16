const express = require('express')
const app = express()
const passport = require ('passport')
const {connectDB} = require('./db/connectDB')
const PORT = process.env.PORT || 4000;
const bodyparser = require ("body-parser");
const Examiner = require ('./models/Examiner')
const Students = require ("./models/student");
const router = require ("./routes/Routes"); 
const expressSession = require('express-session',{
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
  });

app.use(bodyparser.json());

// Connecting DB
connectDB()

//error handler
function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}
app.use(errorHandler)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
    
// passport.serializeUser(Students.serializeUser());
// passport.deserializeUser(Students.deserializeUser());

// passport.serializeUser(Examiner.serializeUser());
// passport.deserializeUser(Examiner.deserializeUser());

//Excluding the search API from Authentication,
app.use('/', router);


//bodyparser
app.use(bodyparser.urlencoded({ extended:true}));

app.use('/', router);
app.use(Students); 
app.use(Examiner)
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})