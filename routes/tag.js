const { Tag } = require('../models/tag');

const router = require('express').Router();
const isAdmin = require('../middlewares/admin');
const isAuth = require('../middlewares/auth');


router.get('/', [isAuth, isAdmin], (req, res) => {
    Tag.find().exec((error, data) => {

        res.render('tag', { tags: JSON.stringify(data) });
    });
});

router.post('/', [isAuth, isAdmin], (req, res) => {
    let tag = new Tag({
        name: req.body.name
    });

    tag = tag.save();
    res.redirect('/tag');

});

router.post('/delete', [isAuth, isAdmin], (req, res) => {
    Tag.deleteOne({ _id: req.body._id }).then(() => {

        res.redirect('/tag');
    }).catch(() => {
        res.redirect('/tag');
    });

});

router.post('/update', [isAuth, isAdmin], (req, res) => {
    Tag.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name }, (error, data) => {
        res.redirect('/tag');
    })
})


module.exports = router;