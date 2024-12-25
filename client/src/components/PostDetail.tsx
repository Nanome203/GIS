import React from "react";
import { FaTimes } from "react-icons/fa";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  contactName: string;
  contactPhone: string;
  price: string;
  area: string;
  amenities: string;
  coordinates: Coordinates;
}

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  return (
    <div className="absolute right-0 top-0 w-full lg:w-1/3 h-full bg-white shadow-lg z-10 overflow-auto scrollbar-thin">
      {/* Nút đóng */}
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Nội dung chi tiết */}
      <div className="p-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.description}</p>
        
        {/* Thêm chi tiết như diện tích, giá, tiện ích */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Giá bán: {post.price}</p>
          <p className="text-lg font-semibold">Diện tích: {post.area}</p>
          <p className="text-lg font-semibold">Tiện ích: {post.amenities}</p>
        </div>
        
        {/* Thông tin liên hệ */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold">{post.contactName}</p>
            <p className="text-sm text-gray-500">SĐT: {post.contactPhone}</p>
          </div>
        </div>

        {/* Vị trí */}
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Tọa độ: {post.coordinates.lat}, {post.coordinates.lng}
          </p>
        </div>

        {/* Các nút liên hệ */}
        <div className="flex space-x-4">
          <button
            onClick={() => alert(`Gọi cho ${post.contactPhone}`)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Gọi
          </button>
          <button
            onClick={() => alert(`Gửi email cho ${post.contactName}`)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Gửi email
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
