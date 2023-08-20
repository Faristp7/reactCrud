import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email ,setEmail] = useState('')
  const [password , setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const response =  axios.post('/login', {email , password})
    const {token} = response
    console.log(token);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Log In
            </button>
          </div>
          <Link to={"/signup"}>
          <p className="my-2 cursor-pointer text-gray-600">Dont have an account ?</p></Link>
        </form>
      </div>
    </div>
  );
}
