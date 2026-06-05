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
