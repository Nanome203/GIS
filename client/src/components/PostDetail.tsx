import React from "react";
import { FaBed, FaDollarSign, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

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
  address: string;
  coordinates: Coordinates;
}

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

function PostDetail({ post, onClose }: PostDetailProps) {
  return (
    <div className="relative h-full w-1/3 overflow-auto bg-white shadow-lg animate-in slide-in-from-right p-6">
      {/* Nút đóng */}
      <button
        className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Post Content */}
      <div className="space-y-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
        <p className="mb-4 text-gray-700">{post.description}</p>

        {/* Thêm chi tiết như diện tích, giá, tiện ích */}

        <div className = "flex items-center space-x-2 mb-2">
          <FaDollarSign className="text-gray-600" />
          <p className="text-lg font-semibold">Giá bán:  {post.price}</p>
          </div>
        <div className="flex items-center space-x-2 mb-2">
          <FaBed className="text-gray-600" />
          <p className="text-lg font-semibold">Diện tích: {post.area}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p className="text-lg font-semibold">Địa chỉ: {post.address}</p>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p>{post.contactName}</p>
            <p className="text-sm text-gray-500">{post.contactPhone}</p>
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
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Gọi
          </button>
          <button
            onClick={() => alert(`Gửi email cho ${post.contactName}`)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Gửi email
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;