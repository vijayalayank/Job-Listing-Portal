import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import { NavBar } from "./Layout/NavBar/NavBar";
import "./App.css";
import Login from "./pages/LogIn/Login";


function App() {
  return (
     <>
     
    <BrowserRouter>
     <NavBar/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
