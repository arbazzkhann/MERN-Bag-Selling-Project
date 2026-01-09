import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false})

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;