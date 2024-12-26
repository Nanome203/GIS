import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate("/edit-profile"); // Chuyển sang trang chỉnh sửa
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
          <p className="text-lg font-semibold text-gray-800">Trang Thien</p>
        </div>
        <ul className="space-y-4">
          {/* Tài khoản của tôi */}
          <li className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black">
            <i className="fas fa-user mr-2"></i>
            Tài khoản của tôi
          </li>
          {/* Bài viết đã lưu */}
          <li className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black">
            <i className="fas fa-bookmark mr-2"></i>
            Bài viết đã lưu
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-6 shadow-md rounded-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800 text-center">
            Hồ Sơ Của Tôi
          </h2>
          <p className="mb-6 text-gray-600 text-center">
            Quản lý thông tin hồ sơ để bảo mật tài khoản.
          </p>
          {/* Hiển thị thông tin */}
          <div className="space-y-6 border-t pt-6">
            {/* Họ và Tên */}
            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-semibold text-gray-700">Họ và Tên</p>
              <p className="text-gray-600">Trang Thien</p>
            </div>
            {/* Số Điện Thoại */}
            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-semibold text-gray-700">Số Điện Thoại</p>
              <p className="text-gray-600">0987654321</p>
            </div>
            {/* Địa Chỉ */}
            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-semibold text-gray-700">Địa Chỉ</p>
              <p className="text-gray-600">Quận 1, TP.HCM</p>
            </div>
            {/* Ngày Sinh */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700">Ngày Sinh</p>
              <p className="text-gray-600">01/01/1990</p>
            </div>
          </div>
          {/* Nút chỉnh sửa */}
          <div className="text-center mt-6">
            <button
              onClick={goToEditPage}
              className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
