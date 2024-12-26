
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jfif";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


interface User {
  name: string;
  avatar: string;
}

const user: User = {
  name: "Nguyễn Văn A",
  avatar: "https://i.pravatar.cc/40",
};

function Header() {
  const navigate = useNavigate();
  // const [isLiked, setIsLiked] = useState(false);

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  // };

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
          <Link to="analysis" className="font-bold hover:text-gray-400">
            Phân tích đánh giá
          </Link>
          <Link to="directory" className="font-bold hover:text-gray-400">
            Danh bạ
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm đất bất động sản..."
            className="h-10 w-80 rounded-full border border-gray-300 bg-white pl-10 pr text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Icon tìm kiếm */}
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-blue-500" />
        </div>

        {/* <button
          onClick={toggleLike}
          className="rounded-full p-2 hover:bg-gray-400"
        >
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
        </button> */}

        <div
          className="flex cursor-pointer items-center space-x-4"
          onClick={() => {
            supabase.auth.signOut();
            alert("Đăng xuất thành công");
            navigate("/authentication");
          }}
        >
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
