import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true, min: 18 },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    description: { type: String, required: true},
    image: { type: String, required: true }, // Image file path
    category: { 
        type: String,
        enum:["Plumber","Electrician","Carpenter","Mechanic"],
        required: true },
    email: { type: String, required: true, unique: true }
  }, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);
export default Service;