import React, { useState, useContext, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { url, token, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
         const response = await axios.post(`${url}/api/order/user-orders`, {}, {headers: {token}});
         
         setData(response.data.data);
    } 

    useEffect(() => {
        if(!token) {
            navigate('/cart');
        }
        fetchOrders();
    }, [token]);

    useEffect(() => {

    }, [token]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index) => {
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index) => {
                            if(index === order.items.length - 1) {
                                return `${item.name} x ${item.quantity}`; //for "last item"
                            }
                            else {
                                return `${item.name} x ${item.quantity}, ` //for all items except last because of "comma"
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>items: {order.items.length}.00</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders