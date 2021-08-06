const jwt = require('jsonwebtoken');
require('dotenv').config();


function auth(req, res, next) {

    const token = req.session.token;
    // console.log(token);
    if (!token)
        return res.redirect('/auth/login');

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.redirect('/auth/login');
    }
}


module.exports = auth;
