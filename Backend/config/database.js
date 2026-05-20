const mongoose=require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParse:true,
        useUnifiedTopology:true,

    })
    .then(() => console.log("db connect sucessfully"))
    .catch((error) =>{
        console.log("Db connection is failed");
        console.error(error);
        process.exit(1);
    })

}