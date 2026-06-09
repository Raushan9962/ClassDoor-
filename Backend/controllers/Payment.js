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


};
exports.varifySignature = async (req, res) => {
    const webhookSecret = "123456",
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digits = shasum.digest('hex');
    if (signature = digits) {
        console.log("Payment is Authorised");
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {

            //fullfill the screen 

            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId }, { $push: { studentsEnrolled: userId } },
                { new: true },
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found',
                })
            }
            console.log(enrolledCourse);

            //find the course and enroll the student in it
            const enrolledStudent = await User.findOneAndUpdate({ _id: userId }, { $push: { courses: courseId } },
                { new: true },
            );
            console.log(enrolledStudent);
            //mail send kardo conformation wala
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratutaions from ClassDoor",
                "Congratulation, you are onborded into new classDoor course",

            );
            console.log(enrolledStudent);
            return res.status(200).json({
                success: true,
                message: "Signature Varified and Course added",
            });
        }

        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,


            })

        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Could not ind the course",
        })
    }
};
