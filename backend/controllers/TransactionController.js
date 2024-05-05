import TransactionModel from "../models/TransactionModel.js"


export const createTransaction = async ({eventId,amount}) => {
    try {
        const createTransaction = await TransactionModel.create({bookingId:eventId,amount})
        return true
    } catch (error) {
        return false
    }
}
