const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//I realized that this would be alot easier if all of the Schemas were in one file
const lockdownSchema = new mongoose.Schema({
  reason: {type: String, 'default': "No reason given"},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true}
});

const characterSchema = new mongoose.Schema({
  name : {type: String, required: true},
  class: {type: String, required: true},
  hp: {type: Number, 'default': 1},
  lockdowns: [lockdownSchema]
});

const userSchema = new mongoose.Schema({
  email: {                                
    type: String,                         
    unique: true,                         
    required: true                        
  },
  name: {                                 
    type: String,                         
    required: true                        
  },
  characters: [characterSchema],
  hash: String,                           
  salt: String                            
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');                                      
  return this.hash === hash;                               
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);                
    return jwt.sign({                                    
        _id: this._id,                                     
        email: this.email,                                 
        name: this.name,                                   
        exp: parseInt(expiry.getTime() / 1000, 10),       
    }, process.env.JWT_SECRET );                                 
};

mongoose.model('User', userSchema);