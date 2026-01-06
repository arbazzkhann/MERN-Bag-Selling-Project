import BagModel from "../models/bag.model.js";
import fs from 'fs';

//add bag item
const addBag = async (req, res) => {
    const { name, mrp, price, image, category, isTopProduct} = req.body;
    let image_filename = `${req.file.filename}`; 

    const bag = new BagModel({
        name,
        mrp,
        price,
        image: image_filename,
        category,
        isTopProduct
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
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
};

const getById = async (req, res) => {
    const { id } = req.body;

    try {
        const bag = await BagModel.findById(id);

        if(!bag) {
            res.status(400).json({
                success: false,
                message: "Product not found!"
            });
        }
    
        res.status(200).json({
            success: true,
            data: bag
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found!"
        });
    }
}

const updateBag = async (req, res) => {
    const {id, data} = req.body;

    

    try {
        await BagModel.findByIdAndUpdate(id, {
            name: data.name,
            category: data.category,
            mrp: data.mrp,
            price: data.price,            
            isTopProduct: data.isTopProduct
        },
        { new: true });

        res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Error while updating!"
        });
    }
}

export default {
    addBag,
    listBag,
    removeBag,
    getById,
    updateBag
}