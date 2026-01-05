import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import Stripe from 'stripe';

//Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {
    const frontendURL = "http://localhost:5173";

    try {
        const newOrder = new OrderModel({
            userId: req.body.userId.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();  //saving into DB
        await UserModel.findByIdAndUpdate(req.body.userId.id, {cartData: {}});  //making cart empty

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        //adding delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 40 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,  //if payment success redirected to this url
            cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`  //if payment fails or canceled redirected to this url
        });

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while place order"
        });
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if(success === "true") {
            await OrderModel.findByIdAndUpdate(orderId, {payment: true});
            res.status(200).json({
                success: true,
                message: "Paid"
            });
        }
        else {
            await OrderModel.findByIdAndDelete(orderId);  //deleting entry if payment fails or cancelled

            res.json({
                success: false,
                message: "Not paid"
            });
        }
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Error while payment"
        });
    }
}

//user orders for frontend
const userOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find({
            userId: req.body.userId.id,
        });

        res.status(200).json({
            success: true,
            data: orders
        });
    } 
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while userOrder"
        });
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        
        res.status(200).json({
            success: true,
            data: orders
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while list orders"
        });
    }
}

// api for updating order status for admin
const updateStatus = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});

        res.status(200).json({
            success: true,
            message: "Status Updated"
        });
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: "Error while"
        });
    }
}

export default {
    placeOrder,
    verifyOrder,
    userOrder,
    listOrders,
    updateStatus
}