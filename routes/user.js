const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const shortId = require('shortid');



router.get('/signup', (req, res) => {
    console.log(req.session.token);
    res.render('register/signup');
});
router.post('/signup', (req, res) => {
    const username = shortId.generate();
    bcrypt.hash(req.body.password, 10).then((password) => {
        const user = new User({
            username: username,
            ...req.body,
            password: password
        });
        user.save((error, data) => {
            res.redirect('/auth/login');
        })
    });

});


router.get('/login', (req, res) => {
    res.render('register/signin');
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        bcrypt.compare(user.email, req.body.email, (err, result)=>{
            if (err) {
            }else{

                const token = jwt.sign({username: user.username, role: user.role, firstname: user.firstname, lastname: user.lastname, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, _id: user._id }, process.env.PRIVATE_KEY, {expiresIn: '2h'});
                req.session.token = token;
                res.redirect('/');
            }
        });
    });

});




router.get('/me', (req, res) => {

})

module.exports = router;