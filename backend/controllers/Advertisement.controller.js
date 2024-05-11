import Advertisement from '../models/Advertisement.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new advertisement
export const create = async (req, res, next) => {
    try {
        const { title, content, category, image, userId } = req.body;
        console.log(req.body);
        const newAdvertisement = new Advertisement({
            title,
            content,
            category,
            image,
            userId
        });
        const savedAdvertisement = await newAdvertisement.save();
        res.status(201).json(savedAdvertisement);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
};

// Get all advertisements by user id
export const getAdvertisements = async (req, res, next) => {
    try {
        const {searchTerm} = req.query
        const userId = req.query.userId;
        const advertisements = await Advertisement.find({ userId });
        res.status(200).json({ advertisements });
    } catch (error) {
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
};

// Get all advertisements by user id
export const getAllAdvertisements = async (req, res, next) => {
    try {
        let query ={
            title: { $regex: '', $options: 'i' }
        };
        const { searchTerm } = req.query;
        if (searchTerm) {

            query.title = { $regex: searchTerm, $options: 'i' }; 
        }

        const advertisements = await Advertisement.find(query);
        res.status(200).json({ advertisements });
    } catch (error) {
        console.log(error);
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
};

// Delete an advertisement
export const deleteAdvertisement = async (req, res, next) => {
    try {
        const advertisementId = req.params.advertisementId; // Removed userId  
        await Advertisement.findByIdAndDelete(advertisementId);
        res.status(204).end();
    } catch (error)
     {
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
};

// Update an advertisement
export const updateAdvertisement = async (req, res, next) => {
    try {
        const advertisementId = req.params.advertisementId; // Removed userId
        const { title, content, category, image } = req.body;
        const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
            advertisementId,
            { title, content, category, image },
            { new: true }
        );
        if (!updatedAdvertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json(updatedAdvertisement);
    } catch (error) {
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
};