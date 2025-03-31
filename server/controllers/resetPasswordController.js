const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

exports.resetPasswordToken = async (req, res) => {
	try {
		const useremail = req.body.email;
		const user = await User.findOne({ email: useremail });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: `This Email: ${email} is not Registered with us. Enter a valid email.`,
			});
		}

		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: useremail },
			{
				token: token,
				resetPasswordExpires: Date.now() + 1800000 // 30 minutes
			},
			{ new: true }
		);
		// console.log("DETAILS", updatedDetails);

		// const url = `${process.env.BASE_URL}/reset-password/${token}`; // Dynamically using base URL
		const url = `http://localhost:3000/reset-password/${token}`;

		await mailSender(
			user.email,
			"Reset Password",
			`Your link for email verification is ${url}.
			Please click on these link to reset your password. It is valid upto 30 minutes.`
		);

		return res.status(200).json({
			success: true,
			message: "Email sent successfully, Please check your email to continue further",
			// token,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Link`,
		});
	}
};


exports.resetPassword = async (req, res) => {
	try {
		const { newPassword, confirmNewPassword } = req.body;
		const { token } = req.params;

		if (confirmNewPassword !== newPassword) {
			return res.status(400).json({
				success: false,
				message: "New password and confirm new password do not match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: "Invalid reset token",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: "Token expired. Please request a new reset link.",
			});
		}
		const hashedUpdatedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findOneAndUpdate(
			{ token: token },
			{ password: hashedUpdatedPassword, token: null },     // Reset token after use
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Password for your account has been reset",
				passwordUpdated(
					updatedUserDetails.email,
					`Your password has been reset successfully, ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			)
			// console.log("Email sent successfully:", emailResponse.response)
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			// console.error("Error occurred while sending email:", error)
			return res.status(500).json({
				success: false,
				error: error.message,
				message: "Error occurred while sending email",
			})
		}

		// Return success response
		return res.status(200).json({
			success: true,
			message: "Password reset successfully"
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
			message: "There was an error in updating the password.",
		});
	}
};