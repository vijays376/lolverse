const Razorpay = require("razorpay");
const crypto = require("crypto");
const Premium = require("../models/Premium");
const User = require("../models/User");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET // Replace with your Razorpay Secret
});

exports.capturePayment = async (req, res) => {
    try {
        const { plan } = req.body;
        const amount = plan === "Pro" ? 5000 : 1000; // Example amounts in paise (1000 paise = 10 INR)

        // Create an order with Razorpay
        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: crypto.randomBytes(16).toString("hex"),
        });

        if (!order) {
            return res.status(500).json({
                success: false,
                message: "Failed to create Razorpay order.",
            });
        }

        // Send the order details back to the client
        return res.status(200).json({
            success: true,
            orderId: order.id,
            amount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });
    }
};





exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;

        // Verify the payment signature
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(orderId + "|" + paymentId);
        const digest = shasum.digest("hex");

        if (digest !== signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed.",
            });
        }

        // Payment verified successfully, save details to database
        // Example: Save the payment details and user info
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Create a new Premium entry
        const premium = await Premium.create({
            plan: req.body.plan,
            amount: req.body.amount / 100, // Convert paise to INR
            premiumExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 30 days from now
        });

        // Optionally: Update user with premium details
        await User.findByIdAndUpdate(req.user.id, { premium });

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully.",
            premium,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });
    }
};




const nodemailer = require("nodemailer");

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Payment Successful",
            text: `Dear ${user.username},\n\nYour payment for the ${req.body.plan} plan was successful.\n\nThank you for choosing our service!\n\nBest Regards,\nThe Team`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Payment success email sent.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });
    }
};
