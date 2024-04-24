async function getAllContacts(req, res) {
    try {
      // Retrieve user ID from the request object
      const userId = req.user.id;
  
      // Fetch contacts associated with the logged-in user
      const contacts = await Contact.find({ userId });
  
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contacts", error });
    }
  }
  