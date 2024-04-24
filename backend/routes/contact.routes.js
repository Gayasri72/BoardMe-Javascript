import express from "express";
import contactController from "../controllers/contact.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/", contactController.createContact);
router.get("/", verifyToken, contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

export default router;
