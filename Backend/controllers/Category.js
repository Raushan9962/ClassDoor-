const Tag = require("../models/Category");

//create Tags ka handler function 

exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;
        //vilidation
        if (!name || !description) {
            return res.status(400).json({
                sucess: false,
                message: "All fields are required",

            })
        }
        //create entry in DB
        const tagDetails = await Tag.create({
            name: name,
            description: description,

        });
        console.log(tagDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "tag cretaed successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};
// getAlltags handler function
exportd.showAllcategorys = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true });
        res.status(200).json(
            {
                success: true,
                message: "All tags are returned successfully",
                allTags,
            }
        )

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//categaryPageDetaisl
exports.categaryPageDetails = async (req, res) => {
    try {
        //get categaryID
        const { categaryId } = req.body;
        //get courses for spacified categaryId
        const selectedCategary = await categaryId.findById(categaryId).populate("courses").exex();

        //validation  
        if (!selectedCategary) {
            return res.status(404).json({
                success: false, message: "Data not found"
            });
        }
        //get coursesfor different categary
        const differentCategary = await categaryId.find({
            _id: { $ne: categaryId }, //ne ka matlab not equal to 
        })
            .populate("caures")
            .exec();

        //get top selling courses
        const topSellingCourses = await Course.aggregate([
            {
                $match: {
                    category: new mongoose.Types.ObjectId(categoryId)
                }
            },
            {
                $addFields: {
                    totalStudents: { $size: "$studentsEnrolled" }
                }
            },
            {
                $sort: {
                    totalStudents: -1
                }
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            success: true,
            data: topSellingCourses,
        });
        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategary,
                differentCategary,
            }
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: Error.message,
        })

    }
}
