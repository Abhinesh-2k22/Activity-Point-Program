import mongoose from "mongoose";

const RentingSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    rentPerMonth: { type: Number, required: true, min: 0 },
    advanceAmount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true},
    address: { type: String, required: true },
    pincode : { type: String, required: true },
    image: { type: String, required: true }, // Image file path

  }, { timestamps: true });

const Renting = mongoose.model("Renting", RentingSchema);

export default Renting;