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
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            });
        }

        // If admin login is requested
        if (isAdmin) {
            if (!user.isAdmin) {
                return res.status(403).json({
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
        res.status(400).json({
            success: false,
            message: "Error while login."
        });
    }
};


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//register user
// const registerUser = async (req, res, next) => {
//     const { name, email, password } = req.body;

//     try {
//         const exists = await UserModel.findOne({email})

//         //checking is user is already exists
//         if(exists) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists"
//             });
//         }
        
//         //validating email format & strong password
//         if(!validator.isEmail(email)) {
//             return res.json({
//                 success: false,
//                 message: "Please enter a valid email."
//             });
//         }

//         //checking password length
//         if(password.length < 8) {
//             return res.json({
//                 success: false,
//                 message: "Password should atleast 8 digit"
//             });
//         }

//         //hasing password
//         const salt = await bcrypt.genSalt(12);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         //creating user
//         const newUser = new UserModel({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const user = await newUser.save();
//         const token = createToken(user._id);

//         res.json({
//             success: true,
//             token
//         });

//     } 
//     catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Error"
//         });
//     }
// }
const registerUser = async (req, res) => {
  const { name, email, password, accessCode, isAdmin } = req.body;

  try {
    // Prevent admin creation with wrong access code
    if (isAdmin && accessCode !== process.env.ACCESS_CODE) {
      return res.status(403).json({
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
    res.status(400).json({
      success: false,
      message: "Error while creating account",
    });
  }
};



export default {
    loginUser,
    registerUser
}
