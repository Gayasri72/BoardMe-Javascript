import Contact from "../models/contact.model.js";

const contactController = {
  // Create a new contact entry
  async createContact(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;
      // Get the authenticated user from the request
      const userId = req.user._id; // Assuming the authenticated user is available in req.user

      const newContact = new Contact({
        name,
        email,
        phone,
        message,
        user: userId, // Associate contact with the authenticated user
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

  // Get all contacts
  async getAllContacts(req, res, next) {
    try {
      // Get the authenticated user from the request
      const userId = req.user._id; // Assuming the authenticated user is available in req.user

      // Find contacts associated with the authenticated user
      const contacts = await Contact.find({ user: userId });
      res.status(200).json({
        success: true,
        contacts,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get contact by ID
  async getContactById(req, res, next) {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }
      res.status(200).json({
        success: true,
        contact,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update contact
  async updateContact(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          phone,
          message,
        },
        { new: true }
      );
      if (!updatedContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        contact: updatedContact,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete contact
  async deleteContact(req, res, next) {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
        contact: deletedContact,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default contactController;
