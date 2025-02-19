const mongoose  = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [{
        name: String,
        price: Number,
        quantity: Number,
        _id: mongoose.Schema.Types.ObjectId,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assuming you have a 'User' model
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    paymentId: String,
    amount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);


