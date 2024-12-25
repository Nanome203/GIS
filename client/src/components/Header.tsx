import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jfif"
// import { Link } from "react-router-dom";

interface User {
  name: string;
  avatar: string;
}

function Header() {
  const user: User = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/40", 
  };

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-10">
   
      <div className="flex items-center space-x-6">
        <img 
          src={logo} 
          alt="Logo"
          className="w-16 aspect-square rounded-full object-fill" 
        />
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-gray-400 font-bold">Đất bán</a>
          <a href="/house-for-rent" className="hover:text-gray-400 font-bold">Đất cho thuê</a>
          <a href="/analysis" className="hover:text-gray-400 font-bold">Phân tích đánh giá</a>
          <a href="/directory" className="hover:text-gray-400 font-bold">Danh bạ</a>
        </nav>
      </div>

      <div className="flex items-center space-x-2">

      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm đất bất động sản..."
          className="w-64 h-10 pl-10 pr-4 rounded-full border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Icon tìm kiếm */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500" />
      </div>

      
      <button onClick={toggleLike} className="p-2 rounded-full hover:bg-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            stroke={isLiked ? "red" : "currentColor"}
            viewBox="0 0 24 24"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              clipRule="evenodd"
            />
          </svg>
        </button>


      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-8 w-8 rounded-full border-2 border-white"
        />
        <span className="text-sm font-bold">{user.name}</span>


      </div>
              
      </div>
    </header>
  );
}

export default Header;
