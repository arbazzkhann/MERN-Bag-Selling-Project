import React, { useContext, useState } from "react";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from "./pages/Orders/Orders.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx"
import { StoreContext } from "./context/StoreContext.jsx";
import LoginNeeded from "./components/LoginNeeded/LoginNeeded.jsx";

const App = () => {
  const {url, token} = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
        <ToastContainer />
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        
        <hr />
        {!token
        ? <LoginNeeded showLogin={showLogin} setShowLogin={setShowLogin}/>
        : (
            <div>
              <Navbar setShowLogin={setShowLogin}/>
              <div className="app-content">
                <Sidebar />
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path="/add" element={<Add url={url}/>}/>
                  <Route path="/list" element={<List url={url}/>}/>
                  <Route path="/orders" element={<Orders url={url}/>}/>
                </Routes>
              </div>
            </div>
          )
        }
    </div>
  );
};

export default App;