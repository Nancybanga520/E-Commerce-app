const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim:true
    },
    user: {
        type: String,
        trim:true
    }
});

const Review=mongoose.model('Review',reviewSchema); // review model bcz reviews can be many so it is one to many relationship.
module.exports=Review;