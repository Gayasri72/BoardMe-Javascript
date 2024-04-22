import Contact from "../models/contact.model.js";

const contactController = {
  async createContact(req, res, next) {
    try {
      const { name, email, phone, message, satisfied } = req.body;
      const userId = req.user._id;

      const newContact = new Contact({
        name,
        email,
        phone,
        message,
        satisfied, // Include satisfied field
        user: userId,
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

  async getAllContacts(req, res, next) {
    try {
      const userId = req.user._id;
      const contacts = await Contact.find({ user: userId });
      res.status(200).json({
        success: true,
        contacts,
      });
    } catch (error) {
      next(error);
    }
  },

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
