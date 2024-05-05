import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema({
    eventId:{
        type:String,
        required:true,
        default:0
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId
    },
    businessName: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    eventIdea: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date().toUTCString()
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    numOfParticipant:{
        type:Number,
        default:0
    },
    coordinatorName: {
        type: String,
        required: true
    },
    coordinatorContactNo: {
        type: String,
        required: true
    },
    paymentMethod:{
        type:String,
        enum:['credit','debit']
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','paid','approved','rejected']
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"
    }
});

const EventModel = mongoose.model('Events', eventSchema);
export default EventModel