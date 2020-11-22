const jwt = require('jsonwebtoken');
module.exports.isAuthenticated = (req ,res , next) => {
    const token = req.cookies.userToken;
    if(!token) {
        res.redirect("/#login");
    }
    else {
        jwt.verify(token , process.env.JWT_SECRET_KEY , (err , authUser) => {
            if(err)
                res.redirect("/#login");
            else {
                req.user = {authUser};
                next();
            }
        })
    }
}