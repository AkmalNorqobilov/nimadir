const { Category } = require('../models/category');
const router = require('express').Router();
const isAdmin = require('../middlewares/admin');
const isAuth = require('../middlewares/auth');


router.get('/', [isAuth, isAdmin], (req, res)=>{
    const category = Category.find().exec((error, data)=>{
        res.render('category', {categories: JSON.stringify(data)});
    });
});

router.post('/', [isAuth, isAdmin], (req, res)=>{
    let category = new Category({
        name: req.body.name
    });

    category = category.save();
    res.redirect('/category');
    
});



router.post('/update', [isAuth, isAdmin], (req, res) => {
    Category.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name }, (error, data) => {
        res.redirect('/category');
    })
})


router.post('/delete', [isAuth, isAdmin], (req, res)=>{
    Category.deleteOne({_id: req.body._id}).then(()=>{
        res.redirect('/category');
    }).catch(()=>{
        res.redirect('/category');
    });

})


module.exports = router;