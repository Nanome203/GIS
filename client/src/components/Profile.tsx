import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { context } from "../utils/context";

type ProfileData = {
  name: string | null;
  display_name: string | null;
  phone: string | null;
  address: string | null;
  birthday: string | null;
  avatar: string | null;
} | null;

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(null);
  const [editData, setEditData] = useState<ProfileData>(null);
  const [reRender, setReRender] = useState(false); // use this as a trigger to re-fetch data
  const navigate = useNavigate();

  const contextData = useContext(context);
  if (!contextData) {
    throw new Error("useContext must be inside a Provider with a value");
  }
  const { id, fullReRender, setFullReRender } = contextData;

  useEffect(() => {
    async function fetchData() {
      const response = await supabase
        .from("profile")
        .select("name, display_name, phone, address, birthday, avatar")
        .eq("id", id);
      if (response.error) {
        console.error("Error fetching user:", response.error.message);
        return null;
      }
      setFormData(response.data[0]);
      setEditData(response.data[0]);
    }
    fetchData();
  }, [reRender, fullReRender]);

  // Xử lý thay đổi trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...editData,
      [e.target.id]: e.target.value,
    } as ProfileData;
    setEditData(newData);
  };

  async function uploadAvatar(file: File) {
    const fileName = `${id}/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);
    if (error) {
      console.error("Error uploading avatar:", error.message);
      return null;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(data.path);
    const { error: updateError } = await supabase
      .from("profile") // Adjust this table name as per your schema
      .update({ avatar: publicUrl })
      .eq("id", id);
    if (updateError) throw updateError;

    setFullReRender((prev) => !prev);
    alert("Avatar updated successfully!");
  }

  const handleChangeAvatar = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .png, .jpeg";
    input.addEventListener("change", async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        await uploadAvatar(file);
      } else {
        console.log("No file selected");
      }
    });
    input.click();
  };

  // Xử lý khi nhấn nút Lưu
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // alert("Thông tin đã được lưu thành công!");
    const { error } = await supabase
      .from("profile")
      .update({
        name: editData?.name,
        display_name: editData?.display_name,
        phone: editData?.phone,
        address: editData?.address,
        birthday: editData?.birthday,
      })
      .eq("id", id);
    if (error) {
      alert("Có lỗi xảy ra khi lưu thông tin");
      setEditData(formData);
      return;
    }
    setIsEditing(false);
    setReRender(!reRender);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditData(formData);
    setIsEditing(false);
  };
  const goToEditPage = () => {
    setIsEditing(true); // Chuyển sang trang chỉnh sửa
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <div className="mb-8 text-center">
          <img
            src={
              formData?.avatar ? formData.avatar : "https://i.pravatar.cc/100"
            }
            alt="User Avatar"
            className="mx-auto mb-4 h-24 w-24 cursor-pointer rounded-full"
            onClick={handleChangeAvatar}
          />
          <p className="text-lg font-semibold text-gray-800">
            {formData?.display_name}
          </p>
        </div>
        <ul className="space-y-4">
          {/* Tài khoản của tôi */}
          <li className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black">
            <i className="fas fa-user mr-2"></i>
            Tài khoản của tôi
          </li>
          {/* Bài viết đã lưu */}
          <li
            className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 hover:bg-gray-200 hover:text-black"
            onClick={() => navigate("saved-posts")}
          >
            <i className="fas fa-bookmark mr-2"></i>
            Bài viết đã lưu
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center">
        {isEditing ? (
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
              Chỉnh Sửa Thông Tin Cá Nhân
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Họ và Tên */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-gray-700"
                >
                  Họ và Tên
                </label>
                <input
                  id="name"
                  type="text"
                  value={editData?.name as string}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              {/* Tên hiển thị */}
              <div>
                <label
                  htmlFor="display_name"
                  className="block font-semibold text-gray-700"
                >
                  Tên hiển thị
                </label>
                <input
                  id="display_name"
                  type="text"
                  value={editData?.display_name as string}
                  onChange={handleChange}
                  placeholder="Nhập tên hiển thị"
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Số Điện Thoại */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Số Điện Thoại
                </label>
                <input
                  id="phone"
                  type="text"
                  value={editData?.phone as string}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Địa Chỉ */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-semibold text-gray-700"
                >
                  Địa Chỉ
                </label>
                <input
                  id="address"
                  type="text"
                  value={editData?.address as string}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Ngày Sinh */}
              <div>
                <label
                  htmlFor="birthday"
                  className="block font-semibold text-gray-700"
                >
                  Ngày Sinh
                </label>
                <input
                  id="birthday"
                  type="date"
                  value={editData?.birthday as string}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Nút lưu */}
              <div className="flex items-center justify-center gap-2 text-center">
                <button
                  className="rounded-lg border-2 border-red-500 bg-red-500 px-6 py-3 text-white hover:bg-red-600"
                  onClick={handleCancel}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="rounded-lg border-2 border-blue-500 px-6 py-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
              Hồ Sơ Của Tôi
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Quản lý thông tin hồ sơ để bảo mật tài khoản.
            </p>
            {/* Hiển thị thông tin */}
            <div className="space-y-6 border-t pt-6">
              {/* Họ và Tên */}
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-semibold text-gray-700">Họ và Tên</p>
                <p className="text-gray-600">{formData?.name}</p>
              </div>
              {/* Tên hiển thị */}
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-semibold text-gray-700">Tên hiển thị</p>
                <p className="text-gray-600">{formData?.display_name}</p>
              </div>
              {/* Số Điện Thoại */}
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-semibold text-gray-700">Số Điện Thoại</p>
                <p className="text-gray-600">{formData?.phone}</p>
              </div>
              {/* Địa Chỉ */}
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-semibold text-gray-700">Địa Chỉ</p>
                <p className="text-gray-600">{formData?.address}</p>
              </div>
              {/* Ngày Sinh */}
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Ngày Sinh</p>
                <p className="text-gray-600">{formData?.birthday}</p>
              </div>
            </div>
            {/* Nút chỉnh sửa */}
            <div className="mt-6 text-center">
              <button
                onClick={goToEditPage}
                className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
