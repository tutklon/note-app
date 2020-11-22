const User = require("../models/User");
const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');
const Validation = require("../middleware/validation");
const jwt = require("jsonwebtoken");
const { options } = require("../routes");
userCtrl = {};
userCtrl.register = async (req ,res) => {
    const {username , email , password} = req.body;
    User.findOne({email: email} , (err , email) => {
        if(err)
           res.send(err);
        else {
            const ValidationErrors = Validation.validateMail(email);
            if (ValidationErrors.length > 0) {
                return res.render('home' , {
                    errors: ValidationErrors
                });
            }
        }
    })
    const ValidationErrors = await Validation.registerValidation(username , email , password);
    if(ValidationErrors.length > 0) {
        return res.render('home' , {
            username,
            email,
            errors: ValidationErrors
        });
    }
    const newUser = await new User({
        username,
        email,
        password
    });
    newUser.save((err , user) => {
        if(err)
            console.log(err);
        else {
            res.redirect("/#login");
        }
    });
}
userCtrl.login = (req ,res , next) => {
    const { email , password } = req.body;
    User.findOne({email: email}).then((user) => {
        if (!user) {
            res.send("This user is not found.");
        }
        else {
           bcrypt.compare(password , user.password , (err , resp) => {
                if (err) {
                    console.log(err);
                } 
                if (resp) {
                    const token = jwt.sign({userId: user._id , username: user.username} , process.env.JWT_SECRET_KEY);
                    res.cookie("userToken" , token , {
                        httpOnly: true,
                        expires: new Date(Date.now + 5 * 10000)
                    });
                    res.redirect("/in");
                }
                else {
                    res.send("This user is not found");
                }
           })
        }
    }).catch((er) => console.log(er));
}
module.exports = userCtrl;