import UserModel from '../models/user.model.js';
import BagModel from '../models/bag.model.js';

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // getting userData from DB
        let userData = await UserModel.findOne({_id: req.body.userId.id});
        const { itemId } = req.body;

        const isIdValid = await BagModel.findOne({_id: itemId});

        if(!isIdValid) {
            return res.status(400).json({
               success: false,
               message: "User not authenticate."
            });
        }
        
        // if userData not found
        if(!userData) {
            return res.status(400).json({
               success: false,
               message: "User not authenticate."
            });
        }

        // fetching cartData from userData
        let cartData = await userData.cartData;
        
        // checking cart is empty or not
        // if empty then assign 1, else incremented by 1
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        // updating User
        await UserModel.findByIdAndUpdate(
            req.body.userId.id,
            { cartData }
        );

        // after everything success
        res.status(200).json({
            success: true,
            message: "Added to cart"
        });
    } catch (error) {  // when error occur
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
}

// remove items from cart
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.body.userId.id;

        const userData = await UserModel.findOne({_id: userId});
        if(!userData) {
            return res.status(400).json({
                success: false,
                message: "User data not found!"
            });
        }

        const cartData = userData.cartData;
        if(!cartData[itemId]) {
            return res.json({
                success: false,
                message: "Add item first in cart."
            });
        }
        else {
            cartData[itemId] -= 1;
        }

        await UserModel.findByIdAndUpdate(userId, {cartData});

        res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });
    }
    catch(error) {
        res.status(200).json({
            success: false,
            message: "Error"
        });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId.id);

        if(!userData) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }
        
        let cartData = await userData.cartData;

        res.status(200).json({
            success: true,
            cartData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
}

export default {
    addToCart,
    removeFromCart,
    getCart,
}