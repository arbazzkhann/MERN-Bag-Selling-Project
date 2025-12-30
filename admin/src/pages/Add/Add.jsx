import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [ image, setImage ] = useState(false);
    const [ data, setData ] = useState({
        name: "",
        description: "",
        mrp: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({...data, [name]: value}))
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('mrp', Number(data.mrp));
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        const response = await axios.post(`${url}/api/bag/add`, formData);

        //after success form data cleared
        if(response.data.success) {
            setData({
                name: "",
                description: "",
                mrp: "",
                price: "",
                category: "Backpacks"
            });
            setImage(false);
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }


  return (
    <div className='add'>
        <form className='flex-com' onSubmit={onSubmitHandler}>
            <div className='add-image-upload flex-col'>
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" required hidden/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Enter product name" />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter description here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="Backpacks">Backpacks</option>
                        <option value="Handbags">Handbags</option>
                        <option value="Laptop Bags">Laptop Bags</option>
                        <option value="Travel Bags">Travel Bags</option>
                        <option value="GYM Bags">GYM Bags</option>
                        <option value="School Bags">School Bags</option>
                        <option value="Brief Cases">Brief Cases</option>
                        <option value="Camera Bags">Camera Bags</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <label>Product MRP</label>
                    <input onChange={onChangeHandler} value={data.mrp} type="number" name="mrp" placeholder='$Enter MRP in INR ₹' required/>
                    <label>Product Price</label>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter price in INR ₹' required/>
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default Add