import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator';

//login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({
            email
        });

        //checking user is not exists
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not exists."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials."
            });
        }

        //generating token after all success
        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token
        });
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error while login."
        });
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const exists = await UserModel.findOne({email})

        //checking is user is already exists
        if(exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        
        //validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email."
            });
        }

        //checking password length
        if(password.length < 8) {
            return res.json({
                success: false,
                message: "Password should atleast 8 digit"
            });
        }

        //hasing password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } 
    catch (error) {
        console.log("Error");
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
}

export default {
    loginUser,
    registerUser
}
