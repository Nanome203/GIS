import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

interface SavedPost {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  address: string;
  price: number;
  phone: string;
  lat: number;
  lng: number;
  description: string;
  contactName: string;
  area: number;
  amenities: string;
}

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSavedPosts() {
      const { data, error } = await supabase.from("saved_posts").select("*");
      if (error) {
        console.error("Error fetching saved posts:", error);
      } else {
        setSavedPosts(data || []);
      }
    }
    fetchSavedPosts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <div className="mb-8 text-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="mx-auto mb-4 h-24 w-24 rounded-full"
          />
          <p className="text-lg font-semibold text-gray-800">Trang Phan</p>
        </div>
        <ul className="space-y-4">
          {/* Tài khoản của tôi */}
          <li
            className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:font-bold"
            onClick={() => navigate("/home/profile")}
          >
            <i className="fas fa-user mr-2"></i>
            Tài khoản của tôi
          </li>
          {/* Bài viết đã lưu */}
          <li className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:font-bold">
            <i className="fas fa-heart mr-2"></i>
            Bài viết đã lưu
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Bài Viết Đã Lưu</h2>

        {/* Kiểm tra trạng thái bài viết đã lưu */}
        {savedPosts.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg font-semibold">Chưa lưu bài post nào.</p>
            <p className="mt-2 text-sm">
              Hãy quay lại danh sách bài đăng và lưu bài viết bạn yêu thích.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border bg-white p-4 shadow-md"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="mb-4 h-40 w-full rounded object-cover"
                />
                <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {post.description}
                </p>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Liên hệ:</strong> {post.contactName} ({post.phone})
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {post.address}
                  </p>
                  <p>
                    <strong>Diện tích:</strong> {post.area} m²
                  </p>
                  <p>
                    <strong>Giá:</strong> {post.price.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Tiện ích:</strong> {post.amenities}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedPosts;