import React from "react";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {
  const url = "https://bagify-backend-1zf6.onrender.com";

  return (
    <div>
        <ToastContainer />
        <Navbar />
        <hr />
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
  );
};

export default App;