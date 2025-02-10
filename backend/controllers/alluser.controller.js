import Renting from "../models/renting.model.js";

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