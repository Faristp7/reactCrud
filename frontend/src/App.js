import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import store from "./app/store";
import AuthWrapper from "./pages/AuthWrapper";
import Login from "./components/login";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate()
  console.log(token);
  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token ,navigate]);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={<AuthWrapper />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
