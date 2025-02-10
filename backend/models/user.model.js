import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    role: {
      type: String,
      enum: ["customer", "grocery_owner", "saloon_owner", "renting_broker", "service_provider"],
      required: true
    },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
  }, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;