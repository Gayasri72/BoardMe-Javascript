import EventModel from "../models/EventModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { createTransaction } from "./TransactionController.js";

export const getAllEvents = async (req, res) => {
    try {
        const allEvents = await EventModel.find();
        res.status(200).json(allEvents)
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}

export const getOneEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await EventModel.findById(id)
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}
export const payForEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const {amount} = req.body
        if(!amount){
            throw Error('Amount is required')
        }
        const data = await EventModel.findById(id)
        data.status = 'paid'
        const newSave = await data.save()

        const t = await createTransaction({eventId:data._id,amount});
        await sendEmail(data?.email, "Payment Success", { name: data.coordinatorName, description: `You hace successfull paid ${amount} LKR for the event id : ${id}` });

        res.status(200).json(t);
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}
export const createEvent = async (req, res) => {
    try {
        const imageName = req.file.filename;
        let data = req.body
        console.log('Data ', data);
        if (!req.body?.userId) {
            data = {
                ...data,
                userId: '65ec0f0ac3aea7cffa83a232',
                image: '/uploads/' + imageName
            }
        }
        const createdEvent = await EventModel.create(data);
        await sendEmail(data?.email, "Event Submitted", { name: data.coordinatorName, description: `You hace successfull submitted the event id : ${createdEvent._id}  /  Please do the payment to continue` });
        res.status(200).json({
            createdEvent
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedEvent = await EventModel.findByIdAndUpdate(id, data)

        res.status(200).json(updatedEvent)
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await EventModel.findByIdAndDelete(id)

        res.status(200).json(updatedEvent)
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (status !== 'pending' || status !== 'approved' || status !== 'rejected') {
            throw Error('Event status can be either pending, approved or rejected only')
        }
        const updatedEvent = await EventModel.findByIdAndUpdate(id, { status: status })

        res.status(200).json(updatedEvent)
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message })
    }
}