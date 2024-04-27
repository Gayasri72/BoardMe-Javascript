import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

// Create a new contact
router.post("/", contactController.createContact);

// Get all contacts
router.get("/", contactController.getAllContacts);

// Update a contact
router.put("/:id", contactController.updateContact);

// Delete a contact
router.delete("/:id", contactController.deleteContact);

export default router;
