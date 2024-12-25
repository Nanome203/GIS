// src/pages/Directory.tsx
import React, { useState, useEffect } from 'react';

const Directory = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Mẫu dữ liệu cho các công ty môi giới
  const companies = [
    {
      id: 1,
      name: 'Công ty ABC Real Estate',
      description: 'Chuyên môi giới nhà đất tại TP.HCM với hơn 10 năm kinh nghiệm.',
      logo: 'https://via.placeholder.com/150',  // Đổi thành logo thật của công ty
      area: 'TP.HCM',
      contactPhone: '0123456789',
    },
    {
      id: 2,
      name: 'Công ty XYZ Real Estate',
      description: 'Môi giới nhà đất tại các quận trung tâm Hà Nội.',
      logo: 'https://via.placeholder.com/150',
      area: 'Hà Nội',
      contactPhone: '0987654321',
    },
    {
      id: 3,
      name: 'Công ty 123 Properties',
      description: 'Đại lý chuyên bán và cho thuê nhà đất ở Đà Nẵng.',
      logo: 'https://via.placeholder.com/150',
      area: 'Đà Nẵng',
      contactPhone: '0912345678',
    },
    {
      id: 4,
      name: 'Công ty MNO Real Estate',
      description: 'Cung cấp các dịch vụ môi giới nhà đất tại Bình Dương.',
      logo: 'https://via.placeholder.com/150',
      area: 'Bình Dương',
      contactPhone: '0934567890',
    },
    {
      id: 5,
      name: 'Công ty DEF Real Estate',
      description: 'Môi giới và quản lý bất động sản tại Quảng Ninh.',
      logo: 'https://via.placeholder.com/150',
      area: 'Quảng Ninh',
      contactPhone: '0986123456',
    },
  ];

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hàm kiểm tra khi người dùng cuộn trang
  const handleScroll = () => {
    if (window.scrollY > 300) {  // Nếu cuộn xuống 300px, nút cuộn sẽ hiển thị
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  // UseEffect để lắng nghe sự kiện cuộn
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-8">
        {companies.map((company) => (
          <div
            key={company.id}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6 flex items-center space-x-4">
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-gray-600 text-sm">{company.description}</p>
              </div>
            </div>

            <div className="bg-gray-100 p-6">
              <p className="font-semibold">Khu vực: {company.area}</p>
              <p className="text-sm text-gray-500">SĐT: {company.contactPhone}</p>
            </div>
          </div>
        ))}

        {showScrollTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default Directory;
