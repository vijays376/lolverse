const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contact = async (req, res) => {
    const { firstName, lastName, email, mobileNumber, message } = req.body;
    console.log(req.body);

     // Input Validation
     if (!firstName || !lastName || !email || !mobileNumber || !message ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required. Please fill in all the fields.",
            error: error.message,
        });
    }

    try {
        // Email sent to the user
        const userEmailRes = await mailSender(
            email,
            "Your Data sent successfully",
            contactUsEmail(firstName, lastName, email, mobileNumber, message)
        );
        console.log("User Email Res ", userEmailRes);

        // Email sent to LOLVerse
        const lolverseEmail = "dev4vijay@gmail.com";
        const lolverseEmailRes = await mailSender(
            lolverseEmail,
            "New Contact Form Submission by LOLVerse User",
            contactUsEmail(firstName, lastName, email, mobileNumber, message)
        );
        console.log("LOLVerse Email Res ", lolverseEmailRes);

        return res.status(200).json({
            success: true,
            message: "Emails sent successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};