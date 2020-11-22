var express = require('express');
var router = express.Router();
const { register , login } = require('../controller/userController');
router.get('/', (req ,res) => {
    res.render("home");
});
router.post('/register' , register);
router.post('/login' ,login);
router.get('/logout' , (req ,res) => {
    res.clearCookie("userToken");
    res.redirect("/");
});

module.exports = router;
