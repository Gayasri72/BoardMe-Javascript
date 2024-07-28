import Viva from "../models/viva.model.js";
import errorHandler from "../utils/error.js";


export const Vivas = async (req, res, next) => {
    const { address, phone,age } = req.body;
  
    if (
      !address ||
      !phone ||
      !age ||
      address === "" ||
      phone === "" ||
      age === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
   
    const newData = new Viva({
      address,
      phone,
      age
    });
  
    try {
      await newData.save();
      res.json("successful");
    } catch (error) {
      next(error);
    }
  };
  