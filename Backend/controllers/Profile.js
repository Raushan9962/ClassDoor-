const profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        //get data 
        const { dataOfBirth = "", about = "", contactNumber, gender } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }



        //find profile
        const userDetails = await User.findById(id);
        const profielId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profielId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            message: 'profile updated successfully', profileDetails,

        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })

    }
}

//delete account 
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation 
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not fount"
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        //todo: hw unenroll user from all enrolled courses 
        //delete user
        await User.findByIdAndDelete({ _id: id });

        //return res
        return res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be delete successfully",
        });
    }

}

exports.getAllUserDetails = async (req, res) => {
    try {
        //get id 
        const id = req.user.id;
        //validate and get user details
        const userDetails = await User.findById(id).populate("additional Details").exec();

        //return res 
        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });


    }

}
