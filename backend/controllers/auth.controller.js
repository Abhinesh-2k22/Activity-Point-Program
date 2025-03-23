import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenandSetCookie } from '../lib/utils/generateToken.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role ,address,pincode} = req.body;

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const samephone = await User.findOne({ phone });
        if (samephone) {
            return res.status(400).json({
                message: "Phone number already exists",
            });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedpass = bcrypt.hashSync(password, salt);
        const newUser = new User({
            name:name,
            email:email,
            password: hashedpass,
            phone:phone,
            role:role,
            address:address,
            pincode:pincode
        });

        if(newUser){
            generateTokenandSetCookie(newUser,res);
            await newUser.save();
            return res.status(201).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                address: newUser.address,
                pincode: newUser.pincode
            });

        }
    }
    catch (err) {
        res.status(400).json({
            message: "Something went wrong",
        });
    }
};

export const signin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user =await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }
        const validpass = await bcrypt.compare(password, user?.password || '');
        if (!validpass) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }
        generateTokenandSetCookie(user,res);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Something went wrong",
        });
    }
};

export const signout = (req, res) => {
    try{
        res.cookie('jwt','',{maxage:0});
        res.status(200).json({
            message: "Signout Successful",
        });
    }catch(err){
        res.status(400).json({
            message: "Something went wrong",
        });
    }
};


export const getcookie = async (req, res) => {
    try {
      const token = req.cookies.jwt
      if (!token) {
        return res.status(400).json({ message: "No cookie found" })
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
      // Fetch user from DB using decoded._id
      const user = await User.findById(decoded._id).select('-password')  // hide password
  
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
  
      res.status(200).json({
        message: "Cookie found",
        user,
      })
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: "Something went wrong" })
    }
  }