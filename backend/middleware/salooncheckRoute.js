import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Saloon from "../models/saloon.model.js";

export const salooncheckRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized:token does not exist",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized:token not decoded",
            });
        }

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        if(user.role !== "saloon_owner") {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const {id} = req.params;
        const owner = await Saloon.findById(id);
        if(owner.email !== user.email){
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(401).json({
            message: "Unauthorized:catch block",
        });
    }
}