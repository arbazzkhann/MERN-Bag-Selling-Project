import React from 'react';
import './Orders.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

const Orders = ({url}) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`);
        if(response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    //order status handler
    const statusHandler = async (e, orderId) => {
        const status = e.target.value;

        const response = await axios.post(`${url}/api/order/status`, {orderId, status});

        if(response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

  return (
    <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
            {orders.map((order, index) => {
                return (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-bag">
                                {order.items.map((item, index) => {
                                    if(index === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity}`; // for last item "without last comma"
                                    }
                                    else {
                                        return `${item.name} x ${item.quantity}, `; // for all items except last item
                                    }
                                })}
                            </p>
                            <p className='order-item-name'>{`${order.address.firstName} ${order.address.lastName}`}</p>
                            <p className="order-item-address">
                                <p>{`${order.address.street}, `}</p>
                                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.pincode}`}</p>
                            </p>
                        </div>
                        <p className='order-item-phone'>{order.address.phone}</p>
                        <p>Items: {order.items.length}</p>
                        <p>₹{order.amount}</p>
                        <p>{order.payment === true ? "Paid" : "Not paid"}</p>
                        <select onChange={e => statusHandler(e, order._id)} value={order.status}>
                            <option value="Processing">Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Orders