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
    
}

// fetch user cart data
const getCart = async (req, res) => {

}

export default {
    addToCart,
    removeFromCart,
    getCart,
}