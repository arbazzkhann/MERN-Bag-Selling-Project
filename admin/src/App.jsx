import React from "react";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar";
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {
  const url = "http://localhost:5000";

  return (
    <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
            <SideBar />
            <Routes>
              <Route path="/add" element={<Add url={url}/>}/>
              <Route path="/list" element={<List url={url}/>}/>
              <Route path="/orders" element={<Orders url={url}/>}/>
            </Routes>
        </div>
    </div>
  );
};

export default App;