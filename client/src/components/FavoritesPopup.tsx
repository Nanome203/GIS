// FavoritesPopup.tsx
import React from "react";

interface Post {
  id: number;
  title: string;
  image: string;
}

interface FavoritesPopupProps {
  favorites: Post[];
  onClose: () => void;
}

const FavoritesPopup: React.FC<FavoritesPopupProps> = ({ favorites, onClose }) => {
  return (
    <div className="absolute top-16 right-10 z-20 w-64 bg-white shadow-lg rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">Danh sách yêu thích</h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {favorites.length > 0 ? (
          favorites.map((post) => (
            <li key={post.id} className="flex items-center space-x-2">
              <img
                src={post.image}
                alt={post.title}
                className="w-12 h-12 object-cover rounded"
              />
              <span className="text-sm">{post.title}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">Chưa có bài viết yêu thích.</li>
        )}
      </ul>
      <button
        className="mt-2 w-full bg-blue-500 text-white rounded py-2"
        onClick={onClose}
      >
        Đóng
      </button>
    </div>
  );
};

export default FavoritesPopup;
