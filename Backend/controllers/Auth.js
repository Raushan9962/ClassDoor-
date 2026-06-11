const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerater = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
//send OTP
exports.sendotp = async (req, res) => {
    try {
        //fetch email from request ki body
        const { email } = req.body;
        //check if user already exist
        const checkUserPresent = await User.findOne({ email });
        //if user already exist,then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "user already registred "
            })

        }
        //generate otp
        var otp = otpGenerater.generate(6, {

            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        //check unique otp or not 
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerater(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        //create an entry in db  for otp
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);
        //return response successful 
        res.status(200).json({
            success: true,
            message: "OTP send successfully",
            otp,
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }

};

//signup 
exports.signup = async (req, res) => {
    try {
        //data fetch from request ki body
        const { firstName, lastName, emaill, password, confirmPassword, accountType,
            contactNumber, otp
        } = req.body;
        //validate karo
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp

        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        //password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and conformPassword value does not match,please try again"
            })

        }
        //check user already  exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is already register",
            })
        }
        //find mot recent otp stored for user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
        //validate OTP
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        } else if (otp !== recentOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalide OTP"
            })

        }
        //hash password
        const hashedPassowrd = await bcrypt.hash(password, 10);
        //entry create in Db
        const profileDetails = await Profiler.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName, lastName, email, contactNumber, password: hashPassowrd,
            accountType,
            addtionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName} `

        })

        //return response
        return res.status(200).json({
            success: true,
            message: " user registered successfully", user
        })


    }


    catch (error) {
        return res.status.json({
            success: false,
            message: { message: message.error },
        })
    }

};

//login
exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;
        //validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false, message: "All fields are required ,please try again",
            });
        }
        //user check exist or not
        const user = await User.findOne({ email }).populate('For additional details');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered,please signup first",
            });
        }
        //generate JWT,after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;


            //create cooking and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
                httpOnly: true,
            }
            res.cookies('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            })

        }
        else {
            return res.status(401).json({
                success: false,
                message: 'password is incorrect',
            })
        }
    }

    catch (error) {
        console.timeLog(error);
        return res.status(500).json({
            success: false,
            message: 'login failed please try again',
        })

    }
};
//changePAssword
exports.changePassword = async (req, res) => {
    //get data from req.body

    // get oldPAssword,newPassword,confirmNewPassword
    //validation
    //update pwd in db
    // send mail-password updated
    //return response

}


