import Contact from "../models/contact.model.js";

const contactController = {
  
  // Create a new contact entry
  async createContact(req, res, next) {
    try {
      const { name, email, phone, message, satisfaction } = req.body;
      if (!name || !email || !phone || !message || !satisfaction) {
        return res.status(400).json({ message: "Please fill in all required fields." });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
      }
      if (!validatePhone(phone)) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
      }
      const newContact = new Contact({
        name,
        email,
        phone,
        message,
        satisfaction,
      });
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      next(error);
    }
  },

  // Get all contacts
  async getAllContacts(req, res, next) {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  },

  // Update a contact
  async updateContact(req, res, next) {
    try {
      const contactId = req.params.id;
      const { name, email, phone, message, satisfaction } = req.body;
      const updatedContact = await Contact.findByIdAndUpdate(contactId, {
        name,
        email,
        phone,
        message,
        satisfaction,
      }, { new: true });
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  },

  // Delete a contact
  async deleteContact(req, res, next) {
    try {
      const contactId = req.params.id;
      const deletedContact = await Contact.findByIdAndDelete(contactId);
      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

const validateEmail = email => {
  // Basic email validation
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePhone = phone => {
  // Basic phone number validation (10 digits)
  const re = /^\d{10}$/;
  return re.test(phone);
};

export default contactController;
