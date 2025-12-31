import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./LoginPopup.css";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({setShowLogin}) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  //Input change handler
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]: value}));
  }

  // handle login and Signup
  const onLogin = async (e) => {
    e.preventDefault();

    let newURL = url;
    if(currentState === "Login") {
      newURL += "/api/user/login"
    }
    else if(currentState === "Sign up") {
      newURL += "/api/user/register"
    }
    else {
      console.log("Error while login");
    }

    
    const response = await axios.post(newURL, data);
    
    if(response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success("Logout success");
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img name="image" onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-input'>
          {currentState === "Sign up" ? <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder='Your name' required/> : <></>}
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' required/>
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder='Your password' required/>
        </div>
        <button type='submit'>{currentState === "Sign up" ? "Create account" : "Login"}</button>
        <div className='login-popup-condition'>
          <input id="checkbox" type="checkbox" required/>
          <label for="checkbox">By continuing, i agree to the terms of use & privacy policy.</label>
        </div>
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup