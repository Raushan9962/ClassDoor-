const Tag = require("../models/Tags");

//create Tags ka handler function 

exports.createTag = async (req, res) => {
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

    }
}