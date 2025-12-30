import React from 'react'
import './List.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
    const [ list, setList ] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/bag/list`);

        if(response.data.success === true) {
            setList(response.data.data);
        }
        else {
            toast.error("Error while fetching :(");
        }

        console.log(response.data.data)
    }

    const removeBag = async (id) => {
        const response = await axios.delete(`${url}/api/bag/remove`, {data: {id}});

        await fetchList();
        
        if(!response.data.success) {
            return toast.error(response.data.message)
        }

        return toast.success("Error")
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Bags List</p>
            <div className="list-table">
                 <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>MRP</b>
                    <b>Price</b>
                    <b>Action</b>
                 </div>
                 {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.mrp}</p>
                            <p>{item.price}</p>
                            <p onClick={() => removeBag(item._id)} className='cursor'>X</p>
                        </div>
                    )
                 })}
            </div>            
        </div>
    )
}

export default List