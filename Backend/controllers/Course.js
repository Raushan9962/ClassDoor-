const Course = require("../models/Course")
const Tag = require("../models/Tags");
const User = require("../models/User");
const { upladImageToCloudinary, uploadImageToCloudinary } = require("../utils/imageUploader");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYoutWillLearn, price, tag } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation 
        if (!courseName || !courseDescription || !whatYoutWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required',
            })
        }
        //check for instructor 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor details not found'
            });

        }
        //check give tag is valid or not 
        const tagDetails = await Tag.findById(tag);
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag details not found",
            })
        }
        //upload image tag cloudinary>
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDecription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYoutWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Could not initiate order"
        });

    }
};
//verify signature of Rozorpay and server



