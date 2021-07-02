const express = require('express')
const {connectDB} = require('./db/connectDB')
const PORT = 4000

const app = express()

// Connecting DB
connectDB()

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})