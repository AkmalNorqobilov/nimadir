const { Category } = require('../models/category');
const { Medicine } = require('../models/medicine');
const { Tag } = require('../models/tag');
const router = require('express').Router();
const isAdmin = require('../middlewares/admin');
const isAuth = require('../middlewares/auth');
const { upload } = require('../middlewares/imageUploader');
const { ImageRemover } = require('../helpers/removerImage');

router.get('/', [isAuth, isAdmin], (req, res) => {
    const medicine = Medicine.find().populate('category', {name:1}).exec((error, medicines) => {
        Tag.find().exec((err, tags) => {
            Category.find().exec((xato, categories) => {

                res.render('medicine',
                    {
                        medicines: JSON.stringify(medicines),
                        tags: JSON.stringify(tags),
                        categories: JSON.stringify(categories)
                    });
            })
        })
    });
});

router.post('/', [isAuth, isAdmin,   upload.single('image')], (req, res) => {
    // console.log(req.file, "faylku bu");
    console.log(req.body);
    
    let medicine = new Medicine({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file?.filename,
        category: req.body.category,
        quantity: req.body.quantity,
        tags: req.body?.tags[1].split(',')
    });
    medicine.save((error, data)=>{
        console.log(data ,error);
    });
    res.redirect('/medicine');

});

router.post('/delete', [isAuth, isAdmin], (req, res) => {
    Medicine.deleteOne({ _id: req.body._id }).then(() => {
        res.redirect('/medicine');
    }).catch(() => {
        res.redirect('/medicine');
    });

});

router.post('/update', [isAuth, isAdmin, upload.single('image')], (req, res) => {
    console.log(req.file, "faylku bu");
    
    Medicine.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req?.file?.filename || "",
        category: req.body.category,
        quantity: req.body.quantity,
        tags: req.body?.tags[1]?.split(',')
    }).then(data=>{
        ImageRemover(data?.image);
    })

    // Medicine.findOne({_id: req.body.id}).exec((error, data)=>{
    //     console.log(data);
    // })
    res.redirect('/medicine');
});


module.exports = router;