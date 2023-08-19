import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setError] = useState([]);

const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post('/register', { email, password, name, phoneNumber })
      .then(({data}) => {
        if (data === true) {
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err)
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.errors)
      }
      else {
        console.error(error.message)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              title="Please enter a valid email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$"
              title="Password must be at least 4 characters long and contain at least one letter and one number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="^[A-Za-z\s]{2,}$"
              title="Please enter a valid name (minimum 2 characters, letters only)"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="^\d{10}$"
              title='Enter 10 digits'
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Sign Up
            </button>
          </div>
          <Link to={"/"}>
            <p className="my-2 cursor-pointer text-gray-600 text-center hover:font-semibold">{errors ? `Have an account` : errors}</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
