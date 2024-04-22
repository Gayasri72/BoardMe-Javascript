import Contact from "../models/contact.model.js";

// Controller for handling contact form submissions
const contactController = {
  // Create a new contact entry
  async createContact(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;
      const newContact = new Contact({
        name,
        email,
        phone,
        message,
      });
      const savedContact = await newContact.save();
      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contact: savedContact,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default contactController;
