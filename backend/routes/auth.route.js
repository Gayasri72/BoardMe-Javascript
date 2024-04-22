import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", contactController.createContact);
// other routes...

export default router;
