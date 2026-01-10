import React, { useContext } from 'react';
import './Navbar.css'
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify';

const Navbar = ({setShowLogin}) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    toast.success("Logout success.")
    navigate("/")
  }

  return (
    <div className='navbar'>
        <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
        
        {!token 
        ? <button onClick={() => setShowLogin(true)}>sign in</button>
        : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="navbar-profile-dropdown">
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  Logout
                </li>
              </ul>
            </div>
          )
        }  
    </div>
  )
}

export default Navbar