const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

//capture the payment and initiate the Rozorpay order
exports.capturePayment = async (req, res) => {
    //get courseId and UserId
    const { course_Id } = req.body;
    const userId = req.user.id;
    //validate
    //valid courseId
    if (!course_Id) {
        return res.status(400).json({
            success: false,
            message: "please provide valid course ID"
        })
    }
    //valid coursedetails
    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "could not find the course"
            });
        }
        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled',
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    //order create
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount =ampunt * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId,
        }

    };
    try {
        //initiate the payment using rezorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDecription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.corrency,
            amount: paymentResponse.amount,
        });

    } catch {
        console.log(error);
        res.json({
            success: false,
        })

    }

    //return response
}