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
  amenities: string;
  coordinates: Coordinates;
}

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

function PostDetail({ post, onClose }: PostDetailProps) {
  return (
    <div className="relative h-full p-6 bg-white overflow-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
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
        <h2 className="text-xl font-bold text-black-800">{post.title}</h2>
        <p className="text-gray-700">{post.description}</p>
        
        <div className="flex items-center space-x-2 mb-2">
          <FaDollarSign className="text-black-600" />
          <p><strong>Giá bán:</strong> {post.price}</p>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <FaBed className="text-gray-600" />
          <p><strong>Diện tích: </strong>{post.area}</p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p><strong>Tiện ích: </strong>{post.amenities}</p>
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
      </div>
    </div>
  );
}

export default PostDetail;