import BagModel from "../models/bag.model.js";
import fs from 'fs';


//add bag item
const addBag = async (req, res) => {
    const { name, email, description, mrp, price, image, category } = req.body;
    let image_filename = `${req.file.filename}`; 

    const bag = new BagModel({
        name,
        description,
        mrp,
        price,
        image: image_filename,
        category
    });

    try {
        await bag.save();
        res.status(200).json({
            success: true,
            message: "Product added",
            bag
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

// all bag list
const listBag = async (req, res) => {
    try {
        const bags = await BagModel.find({});
        res.status(200).json({
            success: true,
            data: bags
        });
    }
    catch(err) {
        console.log("Error while listBag: ", err);
        res.status(400).json({
            success: false,
            message: "Error while listBag :("
        });
    }
}

// remove bag
const removeBag = async (req, res) => {
    const { id } = req.body;

    try {
        const bag = await BagModel.findById(id);
        fs.unlink(`uploads/${bag.image}`, () => {})

        await BagModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Bag removed"
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
};

export default {
    addBag,
    listBag,
    removeBag
}