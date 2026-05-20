const nodemailer =require("nodemailer");

const mailSender =async(email,title, body)=>{
    try{
        /*  1.create transpoter */
        let transpoter =nodemailer.createTransport({
            host:process.env,MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL__PASS,
            }
        })
      /*   send mail wala function used karke mailsend kareneg */ 
      let info = await transpoter.sendMail({
        from:'StudyNotation || codeHelp-raushan',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`,
      })
      console.log(info);
      return info;

    }
    catch(error){
        console.log(error.message);
    }
}
module.exports =mailSender;