import Login from "../components/login";
import Signup from "../components/signUp";
import Home from "../components/home";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function AuthWrapper() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/checkAuth");
        if (response.data.auth) {
          setAuth(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!auth) {
    navigate("/");
    return null;
  }
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  );
}
