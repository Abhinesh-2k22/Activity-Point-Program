import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "grocery_owner", "saloon_owner", "renting_broker", "service_provider"],
      required: true
    }
  }, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;