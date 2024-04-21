import express from "express";
import { createContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

// CRUD routes
router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
