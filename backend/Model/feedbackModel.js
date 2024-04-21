const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    feedback: String
}, {
    timestamps: true
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedbackModel;
