const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const mongoose = require("mongoose");

    exports.connect = () => {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                console.log("Database Connected Successfully");
            })
            .catch((error) => {
                console.log("Db connection is failed");
                console.error(error);
                process.exit(1);
            });
    };


}