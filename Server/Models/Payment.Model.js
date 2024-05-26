const mongoose =require('mongoose')
const paymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: Number,
    transactionId: String,
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);