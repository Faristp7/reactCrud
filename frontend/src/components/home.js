import React, { useState } from 'react';

export default function Home() {
  const [profileImage, setProfileImage] = useState(
    ''
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
      </div>
    </div>
  );
}
