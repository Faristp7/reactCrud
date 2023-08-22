import Login from "../components/login";
import Signup from "../components/signUp";
import Home from "../components/home";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/store";
import ProfileUpdateForm from "../components/UpdateProfile";

export default function AuthWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));

  const user = useSelector(state => state.auth)

  useEffect(() => {
    const checkAuth = async () => {
      if (userLocalStorage) {
        dispatch(setUser(userLocalStorage));
          navigate("/home");
      } else {
        navigate('/')
      }
    };
    checkAuth();
  }, []);

  return (
    <Routes>
          <Route path="/" element={!user.success ? <Login /> : <Home/>} />
          <Route path="/signup" element={!user.success ? <Signup /> : <Home/>} />
          <Route path="/home" element={user.success ? <Home /> : <Login/>} />
          <Route path="/updateProfile" element={user.success ? <ProfileUpdateForm /> : <Login/>} />
    </Routes>
  );
}
