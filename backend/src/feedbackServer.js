const express = require('express');
const cors = require('cors');
const connectDB = require('../index');
const FeedbackModel = require('../Model/feedbackModel');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Create feedback
app.post("/feedback", async (req, res) => {
    try {
        const feedbackData = new FeedbackModel(req.body);
        await feedbackData.save();
        res.status(201).json({ success: true, message: "Feedback saved successfully", data: feedbackData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save feedback" });
    }
});

// Read all feedback
app.get("/feedback", async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find({});
        res.json({ success: true, data: feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch feedback" });
    }
});

// Delete feedback by ID
app.delete("/feedback/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.json({ success: true, message: "Feedback deleted successfully", data: deletedFeedback });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete feedback" });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
