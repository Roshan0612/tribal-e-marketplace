
const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

  const {paymentOrderController,verifyPaymentController}  = require("../controllers/orderController")
const router = express.Router();
// razorpay
 router.post("/payment-order",requireSignIn,paymentOrderController)
 router.post("/verify-payment",requireSignIn,verifyPaymentController)

module.exports  =   router;