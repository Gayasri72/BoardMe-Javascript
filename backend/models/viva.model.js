import mongoose from "mongoose";

const vivaSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
     
    },
    phone: {
      type: String,
      required: true,
      
    },
    age: {
      type: String,
      required: true,
    },
},
{ timestamps: true }
);

const Viva = mongoose.model("Viva", vivaSchema);

export default Viva;