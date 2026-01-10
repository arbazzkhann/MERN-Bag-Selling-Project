import React from "react";
import "./List.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [data, setData] = useState({
        name: "",
        category: "",
        mrp: "",
        price: "",
        isTopProduct: ""
    });

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/bag/list`);

        if (response.data.success === true) {
            setList(response.data.data);
        } else {
            toast.error("Error while fetching :(");
        }
    };

    const removeBag = async (id) => {
        const response = await axios.delete(`${url}/api/bag/remove`, {
            data: { id },
        });

        await fetchList();

        if (!response.data.success) {
            return toast.error(response.data.message);
        }

        return toast.success("Product removed");
    };

    useEffect(() => {
        fetchList();
    }, [data]);

    const onEditHandler = async (id) => {
        const response = await axios.post(`${url}/api/bag/get-by-id`, { id });

        setData({
            name: response.data.data.name,
            category: response.data.data.category,
            mrp: response.data.data.mrp,
            price: response.data.data.price,
            isTopProduct: response.data.data.isTopProduct
        });

        setEditId(id);
        setIsEdit(true);
    };

    const onChangeHandler = (e) => {
        const { name, type, checked, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const updateBag = async (id) => {
        const response = await axios.put(`${url}/api/bag/update`, {id, data});

        if(response.data.success) {
            toast.success("Product successfully updated.");
        }
        else {
            toast.error("Error while update.");
        }

        setIsEdit(false);
        fetchList() //fetching all list
    }

    return (
        <div className="list add flex-col">
            <p>All Bags List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>MRP</b>
                    <b>Price</b>
                    <b>Top Product</b>
                    <b>Action</b>
                </div>
                {list.map((item) => (
                    <div key={item._id} className="list-table-format">
                        <img src={`${url}/images/${item.image}`} alt="" />

                        {isEdit && editId === item._id ? (
                            <input name="name" value={data.name} onChange={onChangeHandler} />
                        ) : (
                            <p>{item.name}</p>
                        )}

                        {isEdit && editId === item._id ? (
                            <select onChange={onChangeHandler} value={data.category} name="category" required>
                                <option value="" disabled selected>Select</option>
                                <option value="Backpacks">Backpacks</option>
                                <option value="Handbags">Handbags</option>
                                <option value="Laptop Bags">Laptop Bags</option>
                                <option value="Travel Bags">Travel Bags</option>
                                <option value="GYM Bags">GYM Bags</option>
                                <option value="School Bags">School Bags</option>
                                <option value="Camera Bags">Camera Bags</option>
                            </select>
                        ) : (
                            <p>{item.category}</p>
                        )}

                        {isEdit && editId === item._id ? (
                            <input 
                                type="number" 
                                name="mrp" 
                                value={data.mrp} 
                                onChange={onChangeHandler} 
                            />
                        ) : (
                            <p>{item.mrp}</p>
                        )}

                        {isEdit && editId === item._id ? (
                            <input
                                 type="number"
                                name="price"
                                value={data.price}
                                onChange={onChangeHandler}
                            />
                        ) : (
                            <p>{item.price}</p>
                        )}
                        {isEdit && editId === item._id ? (
                            <div className="checkbox-wrapper-2">
                                <input 
                                    onChange={onChangeHandler} 
                                    value={data.isTopProduct} 
                                    type="checkbox" 
                                    name='isTopProduct'
                                    checked={data.isTopProduct}
                                    className="sc-gJwTLC ikxBAC"
                                />
                            </div>
                        ) : (
                            <p>{item.isTopProduct === true ? "Yes" : "No"}</p>
                        )}

                        <div>
                            {isEdit && editId === item._id ? (
                                <>
                                    <button onClick={() => setIsEdit(false)} className="button">
                                        Cancel
                                    </button>
                                    <button onClick={() => updateBag(item._id)} className="button">Update</button>
                                </>
                            ) : (
                                <button
                                    onClick={() => onEditHandler(item._id)}
                                    className="button"
                                >
                                    <FaEdit />
                                </button>
                            )}

                            <button onClick={() => removeBag(item._id)} className="button">
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
