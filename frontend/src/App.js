import React from "react";
import axios from "axios";
import Login from "./components/login";
import Signup from "./components/signUp";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div>
      {/* <Login/> */}
      <Signup/>
    </div>
  );
}
