import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../app/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const presetKey = "p2bwkmow";
  const cloudName = "dglfnmf0x";

  const user = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(user.user.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const userId = user.user._id;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dglfnmf0x/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      )
      .then((res) => {
        const url = res.data.secure_url;
        axios
          .post("/updateImage", { url, userId })
          .then(({ data }) => {
            setProfileImage(data.image);
            dispatch(setUser(data))
            localStorage.setItem('user', JSON.stringify(data))
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleLogout() {
    axios.post("/logout").then(() => {
      dispatch(logout());
      localStorage.removeItem("user");
      navigate("/");
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <label htmlFor="image-upload" className="cursor-pointer">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-32 h-32 rounded-full mb-4 hover:opacity-75"
            />
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <h2 className="text-xl font-semibold">{user.user.name}</h2>
          <p className="text-gray-600">{user.user.phone}</p>
          <p className="text-gray-600">{user.user.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Logout
          </button>
          <Link to='/updateProfile'>
            <button
              className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
