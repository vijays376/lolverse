const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/paymentController");

router.post("/capturepayment", auth, capturePayment);
router.post("/verifyPayment", auth, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);

module.exports = router;
