import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [profileImage, setProfileImage] = useState(
    'data:image/png;base64,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'
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <div className='flex flex-col items-center'>
          <label htmlFor='image-upload' className='cursor-pointer'>
            <img
              src={profileImage}
              alt='User Profile'
              className='w-32 h-32 rounded-full mb-4 hover:opacity-75'
            />
            <input
              type='file'
              id='image-upload'
              className='hidden'
              accept='image/*'
              onChange={handleImageUpload}
            />
          </label>
          <h2 className='text-xl font-semibold'>admin</h2>
          <p className='text-gray-600'>97998989</p>
          <p className='text-gray-600'>admin@gmail.com</p>
        </div>
        <button
          onClick={handleLogout}
          className='mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300'
        >
          Logout
        </button>
        <Link to="/test">
        test
        </Link>
      </div>
    </div>
  );
}
