var express = require('express');
var router = express.Router();
const { register , login } = require('../controller/userController');
router.get('/', async (req ,res) => {
    const token = await req.cookies.userToken;
    if (!token) {
        res.render("home");
    } else {
        res.redirect('/in');
    }
    
});
router.post('/register' , register);
router.post('/login' ,login);
router.get('/logout' , (req ,res) => {
    res.clearCookie("userToken");
    res.redirect("/");
});

module.exports = router;
