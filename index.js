const express = require('express');
const path  = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbSession = require('connect-mongodb-session')(session);
dotenv.config();


// database connection
const store = new MongodbSession(
    {
        uri: process.env.DB,
        collection: "session"
        
    }
)
mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=>{
    console.log("Mongodbga online ulandik");
})
.catch((err)=>{
    console.log(err);
})
// my app
const isAdmin = require('./middlewares/admin');
const isAuth = require('./middlewares/auth');

const app = express();

// global middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))


// morgan middleware

app.use(morgan('combined'));
// view engine
app.set('views', path.join(__dirname, "clients"));
app.set('view engine', 'ejs');
app.use(session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
    store: store
}))
// 
app.get('/', [isAuth, isAdmin],  (req, res)=>{
    
    req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
    res.render('index');

});

// app routes
const medicineRouter = require('./routes/medicine');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const { MongoDBStore } = require('connect-mongodb-session');
app.use('/medicine', medicineRouter);
app.use('/tag', tagRouter);
app.use('/category', categoryRouter);
app.use('/auth', userRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server is working");
})