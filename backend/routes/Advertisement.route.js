import express from 'express';
// import { verifyToken } from '../utils/verifyUser.js';
// Correct the imported function name here from `getAdvertisement` to `getAdvertisements`
import { create, deleteAdvertisement, getAdvertisements, getAllAdvertisements, updateAdvertisement } from '../controllers/Advertisement.controller.js';

const router = express.Router();


router.get('/getAdvertisements', getAdvertisements); 
router.get('/search', getAllAdvertisements); 
router.post('/create', create);
router.put('/updateAdvertisement/:advertisementId',  updateAdvertisement);
router.delete('/deleteAdvertisement/:advertisementId',  deleteAdvertisement); // Removed unnecessary :userId
export default router;
