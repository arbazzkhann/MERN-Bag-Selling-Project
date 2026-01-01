import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: Object,
        default: "Processing"
    },
    date: {
        type: date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
});

const OrderModel = mongoose.model.OrderModel || mongoose.model("OrderModel", orderSchema);

export default OrderModel;