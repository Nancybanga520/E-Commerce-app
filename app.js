if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const seedDB=require('./seed');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const localStrategy=require('passport-local');
const User=require('./models/user');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB Connected'))
.catch((err)=> console.log(err));

//seedDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public'))); // middleware to use static files present in public folder.
app.use(express.urlencoded({extended:true})); // middleware to read the req.body due to post method
app.use(methodOverride('_method'));

//session
const sessionConfig={
    secret:'weneedsomebettersecret',
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionConfig)); // session middleware here we are using it for flash.
app.use(flash()); //flash middleware

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //User.authenticate method provided by passport-local-mongoose
// and this method is going to authenticate the user using passport in the local strategy.

passport.serializeUser(User.serializeUser());// yha hme khud ka function nhi likhna pdega passport ka hi use hota h function.
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{ // creating a middleware for set something
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user; //by using current user hr template pr ye aa jaega.
    next();
})

//app.js file should be minimum so we will write all the routes in routes folder.to require all routes
const productRoutes=require('./routes/productRoutes');
const authRoutes=require('./routes/authRoutes');
const cartRoutes=require('./routes/cartRoutes');

app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/error',(req,res)=>{
    res.render('error');
})
// to use all the routes
app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.listen(process.env.PORT||2323,(req,res)=>{
    console.log('Server running at port 2323');
})