import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Events'
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
}, { timestamps: true });

const BookingModel = mongoose.model('Bookings', bookingSchema);
export default BookingModel