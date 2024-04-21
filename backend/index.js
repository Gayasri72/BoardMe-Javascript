import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRouter from "./src/routes/contactRouters.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", contactRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after connecting to MongoDB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
