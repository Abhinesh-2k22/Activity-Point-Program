import Renting from "../models/renting.model.js";
import Grocery from "../models/grocery.model.js";

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