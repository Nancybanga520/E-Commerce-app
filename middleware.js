const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ // it is the method by passport when user is logged in
        req.flash('error','Hey! You need to login first');
        return res.redirect('/login');
    }
    next();
}
module.exports={
    isLoggedIn
}