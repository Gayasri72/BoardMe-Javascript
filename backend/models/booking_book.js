const mongoose = require('mongoose');


const coworkingSpaceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    details: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Private Office', 'Coworking Space', 'Virtual Office', 'Airport Lounge'], 
        required: true },
    imageurls: { 
        type: String, 
        required: true 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    }
});


const CoworkingSpace = mongoose.model('CoworkingSpace', coworkingSpaceSchema);

module.exports = CoworkingSpace;
