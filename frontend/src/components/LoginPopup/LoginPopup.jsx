import React, { useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets';

const LoginPopup = ({setShowLogin}) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]: value}));
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='login-popup'>
      <form action="" className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img name="image" onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-input'>
          {currentState === "Sign up" ? <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder='Your name' required/> : <></>}
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' required/>
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder='Your password' required/>
        </div>
        <button>{currentState === "Sign up" ? "Create account" : "Login"}</button>
        <div className='login-popup-condition'>
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
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