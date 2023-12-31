import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { adminlogout } from '../redux/store';

const UserTable = () => {
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/getUser')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredUsers = userData.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const deleteUser = async (id) => {
        const confirmed = window.confirm('Are you sure want to delete')
        if (confirmed) {
            await axios.delete(`/deleteUser/${id}`)
                .then(({ data }) => {
                    if (data) {
                        setUserData(prevData => prevData.filter(user => user._id !== id))
                        console.log("yes");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleLogout = () => {
        console.log('heloo');
        axios.get('/adminLogout')
        dispatch(adminlogout())
    }

    return (
        <div className="p-6">
            <div className='flex justify-between'>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border-2 border-blue-100 rounded w-full md:w-1/3"
                />
                <div>
                    <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300'>
                        Logout
                    </button>
                </div>
            </div>
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
                            <tr
                                key={user._id}
                                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                    } hover:bg-gray-200 transition-colors`}
                            >
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => deleteUser(user._id)} className="mr-2 px-2 py-1 bg-red-500 text-white rounded transition-colors hover:bg-red-600">
                                        Delete
                                    </button>
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
