import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/getUser') 
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  },[]);

  const filteredUsers = userData.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button className="mr-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;