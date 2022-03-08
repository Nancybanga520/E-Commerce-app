const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product=require('../models/product');
const {isLoggedIn}=require('../middleware');


router.post('/cart/:productid/add',isLoggedIn,async(req,res)=>{
    const {productid}=req.params;
    const product=await Product.findById(productid); // find product by product id...

    const currentUser=req.user; // user logged in hua to ye property add hui
    currentUser.cart.push(product); // product is added in cart array 
    await currentUser.save(); // save the changes done in currentuser.
    req.flash('success','Item added to your cart successfully!!');
    res.redirect(`/products/${productid}`);
})
router.get('/user/cart',isLoggedIn,async(req,res)=>{
    const userid=req.user._id;
    const user=await User.findById(userid).populate('cart');
    res.render('cart/userCart',{user});
});
router.delete('/cart/:id/remove',isLoggedIn,async(req,res)=>{ 
    const productid=req.params.id;
    const userid=req.user._id;
    await User.findByIdAndUpdate(userid,{$pull:{cart:productid}})
    res.redirect('/user/cart');
})
module.exports=router;