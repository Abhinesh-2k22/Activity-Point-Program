import mongoose from "mongoose";

const GrocerySchema = new mongoose.Schema({
    name: { type: String, required: true},
    quantity: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { 
        type: String,
        enum:["fruits&Vegetables","dairy","pantrystaples","snack","beverages","personalcare"],
        required: true },
    email: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true }, // Image file path
    shopName: { type: String, required: true },
    address: { type: String, required: true },
    pincode : { type: String, required: true }
  }, { timestamps: true });

const Grocery = mongoose.model("Grocery", GrocerySchema);

export default Grocery;