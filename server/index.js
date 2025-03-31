const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const database = require("./config/database")
const { cloudinaryConnect } = require("./config/cloudinary");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jokeMemeRoutes = require("./routes/jokeMemeRoutes");

dotenv.config();

const PORT = process.env.PORT || 4001;

// Database connection
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
// 	cors({
// 		// Frontend se agar iss url pr request aayegi to hamara server handle karenge
// 		origin:"http://localhost:3000",
// 		credentials:true,
// 	})
// )
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1", contactRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/joke-meme", jokeMemeRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your LOLVerse server is up and running...."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})