import BookingModel from "../models/Booking.js";
import { sendEmail } from "../utils/sendEmail.js";


export const createBooking = async(req,res)=>{
    try {
        const b  = await BookingModel.create(req?.body);
         await sendEmail(data?.email, "Booking Success", { name: b?.name, description: `You hace successfull paid ${b?.amount} LKR for the event id : ${b?._id}` });
        res.status(200).json(b)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error?.message})
    }
}