import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    toast.success("Logout success.")
    navigate("/")
  }

  return (
    <div className='navbar' id="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className='logo' />
      </Link>

      <ul className="navbar-menu">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          products
        </NavLink>

        <a href="#footer">contact us</a>
      </ul>

      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="search" /> */}

        <div className='navbar-search-icon'>
          <NavLink to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </NavLink>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="navbar-profile-dropdown">
              <NavLink to="/my-orders">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  Orders
                </li>
              </NavLink>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
