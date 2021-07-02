const {connect} = require('mongoose')
// require('dotenv').config()
// const {MONGO_URI} = process.env

// Note: This will be moved to the .env file once we start work
const MONGO_URI = "mongodb+srv://test:test@examinrr.jiuon.mongodb.net/Examinrr?retryWrites=true&w=majority"

exports.connectDB = async ()=> {
    try {
        await connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database Connected")
    } catch (error) {
        console.error(error.message)

        process.exit(1)
    }
}