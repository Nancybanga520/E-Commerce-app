const express=require('express');
const router=express.Router(); // app variable is in app.js so we have to use something else... and in express there is Router() method.
const Product=require('../models/product');
const Review =require('../models/review');
const {isLoggedIn}=require('../middleware');

//get all the products from database
router.get('/products',async(req,res)=>{
    try{
    const products=await Product.find({});
    res.render('products/index',{products}); 
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
// to display the form to add new products...
router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('products/new');
});
//create a new product with the given payload
router.post('/products',isLoggedIn,async(req,res)=>{
    try{
    const newProduct={
        ...req.body   // new product is in req.body and here spread req.body in to newProduct
        }
       await Product.create(newProduct);
       req.flash('success','Product created successfully!!'); // pop up message and this page is redirected to /products so add in /products
       res.redirect('/products');
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
// show a particular product
router.get('/products/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const product=await Product.findById(id).populate('reviews'); // finding the product with this id and populating the reviews array.
    // by populate : whole review comes in reviews array
    res.render('products/show',{product}); // success key k corresponding jo bhi message h vo pass hoga
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
//Edit the product...
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
//After editing we send a patch req.
router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    try{
    const updatedProduct=req.body;
    const {id}=req.params;
    await Product.findByIdAndUpdate(id,updatedProduct);
    res.redirect(`/products/${id}`); // when req goes to /products/${id} that means we are sending the req.to show page.
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
// delete the product...
router.delete('/products/:id',isLoggedIn,async(req,res)=>{
    try{
    const {id}=req.params;
    await Product.findOneAndDelete(id);
    res.redirect('/products');
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
// creating a review for each product
router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    try{
    const {id}=req.params;
    const product=await Product.findById(id); 
    const {rating,comment}=req.body;
    const review=new Review({rating,comment,user:req.user.username}); // this review now is in mongoose side only.
    product.reviews.push(review); // pushing the review in reviews array of product we are pushing the complete rview mongoose automatically push the objectId.

    await product.save();
    await review.save(); // saving review in database

    req.flash('success','Successfully created your review!!'); // key-> success and value is message.
    res.redirect(`/products/${id}`); // show page
    }
    catch(e){
        req.flash('error','oops,something went wrong!!');
        res.redirect('/error');
    }
});
module.exports=router;