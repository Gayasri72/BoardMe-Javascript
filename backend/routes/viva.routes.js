import express from "express";
import { Vivas } from "../controllers/viva.controller.js";


const router = express.Router();
router.post("/", Vivas);
export default router;