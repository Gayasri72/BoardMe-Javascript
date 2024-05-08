import express from "express";
import packageController from "../controllers/package.controller.js";

const router = express.Router();

// Get all packages
router.get("/", packageController.getAllPackages);

// Get a single package by ID
router.get("/:id", packageController.getPackageById);

// Create a new package
router.post("/", packageController.createPackage);

// Update a package
router.put("/:id", packageController.updatePackage);

// Delete a package
router.delete("/:id", packageController.deletePackage);

export default router;
