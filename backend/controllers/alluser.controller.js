import Renting from "../models/renting.model.js";
import Grocery from "../models/grocery.model.js";
import Service from "../models/service.model.js";
import Saloon from "../models/saloon.model.js";
import mongoose from "mongoose";
import moment from "moment-timezone";
//renting
export const dishouse = async (req, res) => {
    try {
        const allhouse = await Renting.find();
        res.status(200).json(allhouse);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addhouse = async (req, res) => {
    const house = req.body;
    house.phoneNumber = req.user.phone;
    house.email = req.user.email;
    const newhouse = new Renting(house);
    try {
        await newhouse.save();
        res.status(201).json(newhouse);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const myhouse = async (req, res) => {
    try {
        const myhouse = await Renting.find({ email: req.user.email });
        res.status(200).json(myhouse);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatemyhouse = async (req, res) => {
    const {id} = req.params;
    const house = req.body;
    try {
        const updatedhouse = await Renting.findByIdAndUpdate(id, house, { new: true });
        res.status(200).json(updatedhouse);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletemyhouse = async (req, res) => {
    const {id} = req.params;
    try {
        await Renting.findOneAndDelete(id);
        res.status(200).json({ message: "House deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//grocery
export const addgrocery = async (req, res) => { 
    const grocery = req.body;
    grocery.email = req.user.email;
    grocery.shopName = req.user.name;
    grocery.address = req.user.address;
    grocery.pincode = req.user.pincode;
    const newgrocery = new Grocery(grocery);
    try {
        await newgrocery.save();
        res.status(201).json(newgrocery);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getallgrocery =async (req, res) => {
    const { category } = req.params;
    console.log("Category requested:", category);
    try {
        if(category !== "all" && category !== "null"){ {
        const allgrocery = await Grocery.find({ category: category });
        res.status(200).json(allgrocery);
        }}
        else{
            const allgrocery = await Grocery.find();
            res.status(200).json(allgrocery);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const mygrocery = async (req, res) => {
    try {
        const mygrocery = await Grocery.find({ email: req.user.email });
        res.status(200).json(mygrocery);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatemygrocery = async (req, res) => {
    const {id} = req.params;
    const grocery = req.body;
    try {
        const updatedgrocery = await Grocery.findByIdAndUpdate(id, grocery, { new: true });
        res.status(200).json(updatedgrocery);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletemygrocery = async (req, res) => {
    const {id} = req.params;
    try {
        await Grocery.findOneAndDelete(id);
        res.status(200).json({ message: "Grocery deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//service provider
export const addservice = async (req, res) => {
    const service = req.body;
    service.phoneNumber = req.user.phone;
    service.email = req.user.email;
    const newservice = new Service(service);
    try {
        await newservice.save();
        res.status(201).json(newservice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getallservice = async (req, res) => {
    try {
        const allservice = await Service.find();
        res.status(200).json(allservice);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const myservice = async (req, res) => {
    try {
        const myservice = await Service.find({ email: req.user.email });
        res.status(200).json(myservice);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}     
export const updatemyservice = async (req, res) => {
    const {id} = req.params;
    const service = req.body;
    try {
        const updatedservice=await Service.findByIdAndUpdate(id, service, { new: true });
        res.status(200).json(updatedservice);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const deletemyservice = async (req, res) => {
    const { id } = req.params;
    const userEmail = req.user.email; // Get logged-in user's email

    try {
        const service = await Service.findOne({ _id: id });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (service.email !== userEmail) {
            return res.status(403).json({ message: "Unauthorized! You can only delete your own service" });
        }

        await Service.findByIdAndDelete(id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




//saloon

export const getallsaloon = async (req, res) => {
    try {
        const allsaloon = await Saloon.find();
        res.status(200).json(allsaloon);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addsaloon = async (req, res) => {
    try {
        const saloon = req.body;
        saloon.phoneNumber = req.user.phone;
        saloon.email = req.user.email;

        // Ensure availableTimings is properly formatted
        if (req.body.availableTimings && typeof req.body.availableTimings === "string") {
            saloon.availableTimings = req.body.availableTimings.split(",").map(time => time.trim());
        }

        const newsaloon = new Saloon(saloon);
        await newsaloon.save();
        res.status(201).json(newsaloon);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get saloon details for the logged-in user
export const mysaloon = async (req, res) => {
    try {
        const mysaloon = await Saloon.find({ email: req.user.email });
        res.status(200).json(mysaloon);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update saloon details
export const updatemysaloon = async (req, res) => {
    const { id } = req.params;
    const saloon = req.body;
    try {
        const updatedsaloon = await Saloon.findByIdAndUpdate(id, saloon, { new: true });
        res.status(200).json(updatedsaloon);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Delete saloon
export const deletemysaloon = async (req, res) => {
    const { id } = req.params;
    try {
        await Saloon.findByIdAndDelete(id);
        res.status(200).json({ message: "Saloon deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Book an appointment 
export const bookAppointment = async (req, res) => {
    try {
        const { customerName, customerPhone, time } = req.body;
        const saloonId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(saloonId)) {
            return res.status(400).json({ message: "Invalid Saloon ID" });
        }
        const now = moment().tz("Asia/Kolkata");
        const today = now.format("YYYY-MM-DD");
        const currentTime = now.format("hh:mm A");

        const saloon = await Saloon.findById(saloonId);
        if (!saloon) return res.status(404).json({ message: "Saloon not found" });
        const lastUpdatedDate = moment(saloon.lastUpdated).tz("Asia/Kolkata").format("YYYY-MM-DD");
        if (lastUpdatedDate !== today) {
            saloon.availableTimings = []; 
            saloon.lastUpdated = new Date(); 
            await saloon.save();
        }

        if (!Array.isArray(saloon.availableTimings) || saloon.availableTimings.length === 0) {
            return res.status(400).json({ message: "No available slots for today" });
        }
        if (!saloon.availableTimings.includes(time)) {
            return res.status(400).json({ message: "Selected time slot is not available" });
        }
        if (moment(time, "hh:mm A").isBefore(moment(currentTime, "hh:mm A"))) {
            return res.status(400).json({ message: "Cannot book a past time slot" });
        }
        saloon.availableTimings = saloon.availableTimings.filter(slot => slot !== time);
        saloon.bookedAppointments.push({ customerName, customerPhone, date: today, time });
        await saloon.save();

        res.status(200).json({ message: "Appointment booked successfully" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const getAvailableSlots = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Saloon ID received:", id); // Debugging

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Saloon ID" });
        }

        // Find the saloon by ID
        const saloon = await Saloon.findById(id);
        if (!saloon) return res.status(404).json({ message: "Saloon not found" });

        console.log("Available timings before filtering:", saloon.availableTimings); // Debugging

        // Get current time and today's date
        const now = moment().tz("Asia/Kolkata");
        const today = now.format("YYYY-MM-DD");
        const currentTime = now.format("HH:mm"); // Use 24-hour format for better comparison

        // Ensure lastUpdated exists, reset if needed
        if (!saloon.lastUpdated || moment(saloon.lastUpdated).tz("Asia/Kolkata").format("YYYY-MM-DD") !== today) {
            console.log("Resetting available timings as lastUpdated is outdated or missing.");
            saloon.availableTimings = []; // Reset
            saloon.lastUpdated = now.toDate();
            await saloon.save();
        }

        // Filter out past time slots
        const filteredTimings = saloon.availableTimings.filter(time => {
            return moment(time, "hh:mm A").isAfter(moment(currentTime, "HH:mm"));
        });

        console.log("Filtered timings:", filteredTimings); // Debugging

        res.status(200).json({ availableTimings: filteredTimings });
    } catch (error) {
        console.error("Error fetching available slots:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};