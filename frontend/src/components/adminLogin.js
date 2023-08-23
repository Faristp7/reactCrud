import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../app/store'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg , setErrMsg] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin-login', { email, password }); 
      setErrMsg(response.data.message)
      if (response.status === 200) {
        navigate('/dashboard')
        dispatch(setAdmin())
      }
    } catch (error) {
      console.log(error ,'axios err');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 border-blue-100 border-2 rounded shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email:</label>
            <input
              className="w-full px-3 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Password:</label>
            <input
              className="w-full px-3 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            type="submit"
          >
            Login
          </button>
          {errMsg && <p className='text-red-600 text-center mt-2'>{errMsg} &nbsp;</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
