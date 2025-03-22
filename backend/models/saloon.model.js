import mongoose from "mongoose";

const SaloonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },

    availableTimings: {
        type: [String], // Stores time slots as an array of strings
        required: true,
        default: [], // Default is empty every new day
    },

    bookedAppointments: [
        {
            customerName: { type: String, required: true },
            customerPhone: { type: String, required: true },
            date: { type: String, required: true }, // Store date explicitly
            time: { type: String, required: true },
        },
    ],

    lastUpdated: {
        type: Date,
        default: Date.now, // Track when timings were last updated
    },
});

const Saloon = mongoose.model('Saloon', SaloonSchema);

export default Saloon;
