const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email,email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "Your Email is not registered with us"
            });

        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time 
        const updatedDeatils = await User.findOneAndUpdate({
            email: email
        }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
            { new: true }
        )
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailsender(email, "password reset link", `password Reset Link ${url}`)
        // return response
        return res.json({
            success: true,
            message: "Eamil send successfully, please check email and change password "
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "spmething went wrong while reset pwd mail "
        })


    }
}

//resetPassword 
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const { password, conformPassword, token } = req.body;
        //validation
        if (password !== consfirmPassword) {
            return res.json({
                success: false,
                message: 'password not matching',
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({ token: token });
        //if no entry-invalide token
        if (!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invalide',
            });

        }
        //token time check

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: 'Token is expired please regenerate your token'
            });
        }
        //hash password 
        const hashPassword = await bcript.hash(password, 10);
        //password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashPassword },
            { new: true },
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "password reset successfully"
        })

    }


    catch (errro) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went worng "
        })
    }
}