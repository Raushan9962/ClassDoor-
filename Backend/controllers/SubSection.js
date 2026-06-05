const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsection 
exports.createSubsection = async (req, res) => {
    try {
        //fetch data 
        const { sectionId, title, timeDuration, description } = req.body;
        //extract the file/video
        const video = req.files.videoFile;


        //data validate
        if (!title || !sectionId || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: " All fields are required",
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //crete sub-section 
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        //update Section with subsection objectID
        const updateSectionDetails = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                sectionContent: SubSectionDetails.id,
            }
        }, { new: true },).populate('For additional details');
        //return res
        return res.status(200).json({
            success: true,
            message: "Subsection created Successfully",
            updateSectionDetails
        })
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Unable to create  SubSection ,Please try again",
            error: error.message,
        });

    }
}

exports.updateSubsection = async (req, res) => {
    try {
        //data input
        const { subSectionName, subSectionId } = req.body;
        //data validation 
        if (!subSectionName || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }
        //update data
        const subeSction = await SubSection.findByIdAndUpdate(subSectionId, { subSectionName }, { new: true });
        //return res 
        return res.status(200).json({
            success: true,
            message: "Subsection Updated Successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section ,Please try again",
            error: error.message,
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { subSectionId } = req.params
        //use findByIdAndDelete
        await SubSection.findByIdAndDelete(subSectionId);
        //return res
        return res.status(200).json({
            stats: true,
            message: "Subsection Delete Successfully",
        });

    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section please try again",
            error: error.message
        })

    }
}
