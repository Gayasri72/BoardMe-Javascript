import express from "express";
import contactController from "../controllers/contact.controller.js";
import { signin, signup, google,signOut,forgetPass } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google)
router.post('/google', google);
router.get('/signout', signOut)
router.post("/", contactController.createContact);
router.post("/forgot-password",forgetPass)



export default router;
