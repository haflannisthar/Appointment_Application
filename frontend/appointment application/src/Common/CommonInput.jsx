import React from 'react';
import { useLocation } from 'react-router-dom';

function CommonInput({ type, placeholder, value, onChange, name, label }) {
  const location = useLocation();

  return (
    <div className="w-full flex flex-col gap-4"> 
      <label htmlFor={name} className="text-sm font-medium text-blue-950 w-full text-left">
        {label} 
        {
            location.pathname === '/register'? <span className='text-red-600'> * </span>:null
        }

      </label>
      <div className="">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-md bg-white px-3 py-3 text-base text-blue-950 outline-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
       
       />
      </div>

    </div>
  );
}

export default CommonInput;
