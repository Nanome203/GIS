import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  // Trạng thái lưu thông tin người dùng
  const [formData, setFormData] = useState({
    name: "Trang Phan",
    phone: "0987654321",
    address: "Quận 1, TP.HCM",
    dob: "1990-01-01", // Định dạng ngày tháng
  });

  // Xử lý thay đổi trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Xử lý khi nhấn nút Lưu
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thông tin đã được lưu thành công!");
    navigate("/home/profile"); // Quay lại trang hồ sơ cá nhân
  };

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
            className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black"
            onClick={() => navigate("/home/profile")}
          >
            <i className="fas fa-user mr-2"></i>
            Tài khoản của tôi
          </li>
          {/* Bài viết đã lưu */}
          <li
            className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black"
            onClick={() => navigate("/home/saved-posts")}
          >
            <i className="fas fa-bookmark mr-2"></i>
            Bài viết đã lưu
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white p-6 shadow-md rounded-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800 text-center">
            Chỉnh Sửa Thông Tin Cá Nhân
          </h2>
          <form onSubmit={handleSave} className="space-y-6">
            {/* Họ và Tên */}
            <div>
              <label htmlFor="name" className="block font-semibold text-gray-700">
                Họ và Tên
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Số Điện Thoại */}
            <div>
              <label htmlFor="phone" className="block font-semibold text-gray-700">
                Số Điện Thoại
              </label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Địa Chỉ */}
            <div>
              <label htmlFor="address" className="block font-semibold text-gray-700">
                Địa Chỉ
              </label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Ngày Sinh */}
            <div>
              <label htmlFor="dob" className="block font-semibold text-gray-700">
                Ngày Sinh
              </label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Nút lưu */}
            <div className="text-center">
              <button
                type="submit"
                className="rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;
