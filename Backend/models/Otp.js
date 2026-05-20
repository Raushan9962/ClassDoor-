const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema =new mongoose.Schema({

email:{
    type:String,
    required:true,
},
otp:{
    type:String,
    required:true,
},
createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
},




});

//a function -> to send emails
async function sendVarificationEmail(email,otp){
    try{
   const mailResponse = await mailSender(email,"varification email form studyNotion",otp);
   console.log("Email send Successfuly",mailResponse)
    }
    catch(error){
        console.log("erro occured while sending mails:",error);
        throw error;
    }

}
otpSchema.pre("save",async function(next){
    await sendVarificationEmail(this.email,this.otp);
    next();
})


module.exports =mongoose.model("OTP",otpSchema);