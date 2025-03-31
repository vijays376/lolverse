const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

exports.auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "")

            // console.log("jwt req.cookies.token: ", token)
            // console.log("jwt req.body.token: ", token)
            // console.log("jwt Bearer token: ", token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Token Missing`
            })
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: error.message,
            message: "Something went wrong while validating token"
        })
    }
};