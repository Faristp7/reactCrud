import Login from "../components/login";
import Signup from "../components/signUp";
import Home from "../components/home";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setUser } from "../app/store";
import AdminLogin from "../components/adminLogin";
import UserTable from "../components/AdminDashboard";
import axios from "axios";
import ProfileUpdateForm from "../components/UpdateProfile";

export default function AuthWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const checkAuth = async () => {
      if (userLocalStorage) {
        dispatch(setUser(userLocalStorage));
        navigate("/home");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    axios.get("/checkAdminAuth")
    .then((res) => {
      if (res.data.message) {
        dispatch(setAdmin())  
      }
    });
  },[admin.success]);

  return (
    <Routes>
      <Route path="/" element={!user.success ? <Login /> : <Home />} />
      <Route path="/signup" element={!user.success ? <Signup /> : <Home />} />
      <Route path="/home" element={user.success ? <Home /> : <Login />} />
      <Route path="/updateProfile" element={user.success ? <ProfileUpdateForm /> : <Login />} />
      <Route
        path="/admin"
        element={!admin.success ? <AdminLogin /> : <UserTable />}
      />
      <Route
        path="/dashboard"
        element={admin.success ? <UserTable /> : <AdminLogin />}
      />
    </Routes>
  );
}
