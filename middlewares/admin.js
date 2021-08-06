module.exports = function (req, res, next) {
    if (req.user.role != "admin")
        return res.redirect('/auth/login');;

    next();
}
