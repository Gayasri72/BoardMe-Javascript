import Contact from "../models/contact.model.js";

const contactController = {
  

  // Create a new contact entry
  async createContact(req, res, next) {
    try {
      const { name, email, phone, message, satisfaction } = req.body;
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


  
};

export default contactController;
