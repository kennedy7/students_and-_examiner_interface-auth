const { Schema, model } = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')
const validate = require ('express-validator')
const bcrypt = require ('bcrypt')

const ExaminerSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Enter an email'],
        validate: {
          validator: function (value) {
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value.toLowerCase());
          },
          message: 'Enter a valid email',
        },
    },
    password: {
      type: String,
      required: [true, 'Password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      // required: [true, 'Confirm your password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    staffId:{
      type: String,
      required:[true, 'Enter staff Id'],
      minlength: [4, 'Password must be at least 8 characters'],
      unique: true
    },
    role: {
      type: String,
      enum: ["nil", "Examiner"],
      default: "Examiner"
    },
   
  });
  try{
  ExaminerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
    }); } catch (err){ console.log(err)}


//compare password for login
module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, isMatch)=>{
    if (err) throw err;
    callback(null, isMatch);
  });
}
  ExaminerSchema.methods.comparePassword = async function (inputPassword) {
    let Examiner = this;
    return await bcrypt.compare(inputPassword, Examiner.password);
};

  // ExaminerSchema.methods.comparePassword = async function comparePassword(passwordInput, password) {
  //   return await bcrypt.compare(passwordInput, password);
  // };
  ExaminerSchema.plugin(uniqueValidator);
  
  module.exports = model('Examiner', ExaminerSchema);
