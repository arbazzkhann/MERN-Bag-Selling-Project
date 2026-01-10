import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./LoginPopup.css";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: true,     // ALWAYS TRUE (Your requirement)
    accessCode: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let apiURL = url;

    if (currentState === "Login") {
      apiURL += "/api/user/login";

      const payload = {
        email: data.email,
        password: data.password,
        isAdmin: true,         // Force admin login
      };

      const response = await axios.post(apiURL, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Admin login success");
      } else {
        toast.error(response.data.message || "Not allowed!");
      }

      return;
    }

    // SIGN UP  
    if (currentState === "Sign up") {
      apiURL += "/api/user/register";

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        accessCode: data.accessCode,
        isAdmin: true,      // user is attempting admin register
      };

      const response = await axios.post(apiURL, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className='login-popup-input'>
          {currentState === "Sign up" && (
            <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder='Your name' required />
          )}

          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' required />

          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder='Your password' required />

          {currentState === "Sign up" && (
            <input name="accessCode" value={data.accessCode} onChange={onChangeHandler} type="password" placeholder='Enter access code' required />
          )}
        </div>

        <button type='submit'>
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>

        <div className='login-popup-condition'>
          <input id="checkbox" type="checkbox" required />
          <label htmlFor="checkbox">By continuing, I agree to the terms.</label>
        </div>

        {currentState === "Login" ? (
          <p>Create a new admin account? <span onClick={() => setCurrentState("Sign up")}>Click here</span></p>
        ) : (
          <p>Already have an admin account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
