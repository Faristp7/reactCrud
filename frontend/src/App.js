import React from "react";
import axios from "axios";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}
