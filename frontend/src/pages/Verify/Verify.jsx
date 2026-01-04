import React, { useContext, useEffect, useRef } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
    const token = localStorage.getItem("token");
    const { url } = useContext(StoreContext);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const navigate = useNavigate();
    const called = useRef(false);

    // const success = searchParams.get("success") === "true";
    // const orderId = searchParams.get("orderId");

    console.log("success: ", success);
    console.log("typeof success: ", typeof success);

    console.log("orderId: ", orderId);
    console.log("typeof orderId: ", typeof orderId);
    
    const verifyPayment = async () => {
      const response = await axios.post(`${url}/api/order/verify`, {success, orderId}, {headers: {token}});
      if(response.data.success) {
        navigate('/my-orders');
      }
      else {
        navigate('/');
      }
    }
    
    //useEffect for calling verifyPayment
    useEffect(() => {
      if (called.current) return;
      called.current = true;

      verifyPayment();
    }, []);


  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify;