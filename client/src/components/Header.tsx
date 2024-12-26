import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.jfif";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Trạng thái menu
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null); // Ref để tham chiếu menu

  const handleLogout = () => {
    supabase.auth.signOut();
    navigate("/authentication");
  };

  const goToProfile = () => {
    navigate("profile");
  };

  // Đóng menu khi nhấn ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-[100] flex w-full items-center justify-between bg-gray-800 px-6 py-4 text-white">
      <div className="flex items-center space-x-6">
        <img
          src={logo}
          alt="Logo"
          className="aspect-square w-16 rounded-full object-fill"
        />
        <nav className="flex space-x-6">
          <Link to="/home" className="font-bold hover:text-gray-400">
            Đất bán
          </Link>
          <Link to="house-for-rent" className="font-bold hover:text-gray-400">
            Đất cho thuê
          </Link>
          <Link to="directory" className="font-bold hover:text-gray-400">
            Danh bạ
          </Link>
        </nav>
      </div>

      <div className="relative flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm đất bất động sản..."
            className="h-10 w-80 rounded-full border border-gray-300 bg-white pl-10 text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-blue-500" />
        </div>

        <div
          className="relative flex cursor-pointer items-center space-x-4"
          onClick={() => setMenuOpen((prev) => !prev)}
          ref={menuRef} // Gắn ref vào container menu
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="aspect-square w-14 rounded-full border-2 border-white"
          />
          {/* Dropdown menu */}
          {menuOpen && (
            <div
              className="absolute right-0 top-16 w-48 rounded-lg bg-white shadow-lg"
              ref={menuRef}
            >
              <ul className="text-gray-700">
                <li
                  onClick={goToProfile}
                  className="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  <FaUser className="mr-3 text-blue-500" /> Cá nhân
                </li>
                <li
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="mr-3 text-red-500" /> Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
