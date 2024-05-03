import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    pac_name: {
        type: String,
        required: true
    },
    features: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
