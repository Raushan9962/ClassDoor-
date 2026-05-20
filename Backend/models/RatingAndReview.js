const  mongoose =require("mongoose")

const ratingAndReviewsSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rating:{
        type:Number,
        requied:true,
    },
    review:{
        type:String,
        required:true,
    }

})
module.exports =mongoose.model("ratingAndReview",ratingAndReviewsSchema)