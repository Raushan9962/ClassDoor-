const mongoose = require("mongoose");
const Course = require("./Course");
const CategorysSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },


});
module.exports = mongoose.model("tags", CategorysSchema);