import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator';

//login user
const loginUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist."
            });
        }

        // If admin login is requested
        if (isAdmin) {
            if (!user.isAdmin) {
                return res.json({
                    success: false,
                    message: "Access denied. This is not an admin account."
                });
            }
        }

        // Password match check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials."
            });
        }

        // Generate token
        const token = createToken(user._id);

        res.status(200).json({
            success: true,
            token
        });
    } 
    catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error while login."
        });
    }
};


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
  const { name, email, password, accessCode, isAdmin } = req.body;

  try {
    // Prevent admin creation with wrong access code
    if (isAdmin && accessCode !== process.env.ACCESS_CODE) {
      return res.json({
        success: false,
        message: "Invalid admin access code. Account creation denied.",
      });
    }

    // Email already exists check
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Account already exists",
      });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set admin flag
    const finalIsAdmin = isAdmin && accessCode === process.env.ACCESS_CODE;

    // Create user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: finalIsAdmin,
    });

    const token = createToken(newUser._id);

    res.status(200).json({
      success: true,
      token,
      message: finalIsAdmin
        ? "Admin account created successfully"
        : "User account created successfully",
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error while creating account",
    });
  }
};



export default {
    loginUser,
    registerUser
}
