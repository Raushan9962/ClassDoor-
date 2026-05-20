const mongoose =require("mongoose")

const courseProgressSchema =new mongoose.Schema({
    courseID:{

        type:mongoose.Schema.Types.ObjectId,
        reff:"Course",
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],

});
module.exports =mongoose.model("courseProgress",courseProgressSchema);