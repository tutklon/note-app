const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { find } = require('./Note');
const Validation = require("../middleware/validation");
const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        minlength: 6,
        required:true
    },
    about:{
        type:String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
    
})
User.pre('save' , function(next) {
    bcrypt.hash(this.password , 10).then((hash) => {
        this.password = hash;
        next();
    }).catch((err) => next(err));
})
module.exports = mongoose.model("User" , User);