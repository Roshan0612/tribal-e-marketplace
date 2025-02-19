const { default: slugify } = require("slugify");
const fs = require("fs");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
var CryptoJS = require("crypto-js");
const dotenv = require("dotenv")

dotenv.config();
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
// var AES = require("crypto-js/aes");
// var sha256 = require("crypto-js/sha256");

// const hashDigest = sha256(nonce + message);
// const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));


const paymentOrderController=async(req,res)=>{
    try {
        const { cart, total } = req.body; // Assuming the cart and total amount are passed from the frontend

        // Create an order in Razorpay
        const orderOptions = {
            amount: total * 100, // Convert to paise (1 INR = 100 paise)
            currency: "INR",
            receipt: `order_${Date.now()}`,
            notes: {
                cartDetails: cart,
            },
        };
        razorpayInstance.orders.create(orderOptions, async (err, order) => {
            if (err) {
                return res.status(500).send({
                    message: "Error while creating Razorpay order",
                    error: err,
                });
            }

            // Create order in the database
            const orderDoc = new Order({
                user: req.user._id,
                products: cart,
                amount: total,
                paymentStatus: 'Pending',
                paymentId: order.id,
            });

            await orderDoc.save();

            res.status(200).send({
                success: true,
                order,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while creating payment",
        });
    }
}

const verifyPaymentController=async(req,res)=>{
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const order = await Order.findOne({ paymentId: razorpay_order_id });

    if (!order) {
        return res.status(404).send({ message: "Order not found" });
    }

    const hmac = CryptoJS.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        // Payment is successful
        order.paymentStatus = 'Completed';
        order.paymentId = razorpay_payment_id;

        await order.save();

        res.status(200).send({ success: true, message: "Payment verified" });
    } else {
        // Payment failed
        order.paymentStatus = 'Failed';
        await order.save();

        res.status(400).send({ success: false, message: "Payment verification failed" });
    }
}
module.exports={verifyPaymentController, paymentOrderController}