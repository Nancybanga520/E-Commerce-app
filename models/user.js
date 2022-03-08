const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose'); // this package automatically adds username and password in to your schema.
// in user schema: we wants to store the username and password of userin database.
const userSchema=new mongoose.Schema({
    // username and password is auto.. added
   email:{
       type:String,
       required:true,
       unique:true,
       trim:true
   },
   cart:[  // cart will be an array
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:'Product'  // objectId have ref to product model.
       }
   ]
});
userSchema.plugin(passportLocalMongoose); // username and password is added in userSchema by plugin.
const User=mongoose.model('User',userSchema);
module.exports=User;