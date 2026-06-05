const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;


        //data validations
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            });
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        }, { new: true },
        ).populate('For additional details');

        //return response
        return res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updatedCourseDetails,
        });



    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section ,Please try again",
            error: error.message,
        });

    }

}

exports.updateSection = async (req, res) => {
    try {
        //data input
        const { sectionName, sectionId } = req.body;

        //data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }
        // update data 
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
        //return res
        return res.status(200).json({
            success: false,
            msessage: "Section Updated successfully"
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section ,Please try again",
            error: error.message,
        });

    }
};

exports.deleteSection = async (req, res) => {
    try {
        //get Id 
        const { sectionId } = req.params
        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[testing time ] :do we need to delete the entry from the course schema ?? 
        //return res
        return res.status(200).json({
            ststus: false,
            message: "Section delete Successfully",
        });



    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section please try again",
            error: error.message
        })

    }
}
