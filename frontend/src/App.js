import React from "react";
import axios from "axios";
import Login from "./components/login";
import Signup from "./components/signUp";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}
