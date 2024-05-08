import Package from "../models/package.model.js";

const packageController = {
    // Get all packages
    async getAllPackages(req, res, next) {
        try {
            const packages = await Package.find();
            res.status(200).json({ success: true, data: packages });
        } catch (error) {
            next(error);
        }
    },

    // Get a single package by ID
    async getPackageById(req, res, next) {
        try {
            const packageId = req.params.id;
            const pack = await Package.findById(packageId);
            if (!pack) {
                return res.status(404).json({ message: "Package not found" });
            }
            res.status(200).json(pack);
        } catch (error) {
            next(error);
        }
    },

    async createPackage(req, res, next) {
        try {
            const { pac_name, features, price } = req.body; // Remove 'speed' from here
            const newPackage = new Package({
                pac_name,
                features,
                price
            });
            const savedPackage = await newPackage.save();
            res.status(201).json(savedPackage);
        } catch (error) {
            next(error);
        }
    },
    
    async updatePackage(req, res, next) {
        try {
            const packageId = req.params.id;
            const { pac_name, features, price } = req.body; // Remove 'speed' from here
            const updatedPackage = await Package.findByIdAndUpdate(packageId, {
                pac_name,
                features,
                price
            }, { new: true });
            if (!updatedPackage) {
                return res.status(404).json({ message: "Package not found" });
            }
            res.status(200).json(updatedPackage);
        } catch (error) {
            next(error);
        }
    },

    // Delete a package
    async deletePackage(req, res, next) {
        try {
            const packageId = req.params.id;
            const deletedPackage = await Package.findByIdAndDelete(packageId);
            if (!deletedPackage) {
                return res.status(404).json({ message: "Package not found" });
            }
            res.status(200).json({ message: "Package deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
};

export default packageController;
