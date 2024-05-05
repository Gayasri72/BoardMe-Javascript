import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default:0
    },
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bookings'
    }
}, { timestamps: true });

const TransactionModel = mongoose.model('Transactions', transactionSchema);
export default TransactionModel