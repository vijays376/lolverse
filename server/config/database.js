const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Database Connected Successfully"))
        .catch((error) => {
            console.log("Database connection failed.");
            console.error(error)
            process.exit(1);  //If error occur then exits without executing remaining code
        })
}