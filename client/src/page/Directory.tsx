import React, { useState, useEffect } from "react";

const Directory = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Dữ liệu mẫu cho các công ty môi giới tại TP.HCM
  const companies = [

      {
        id: 1,
        name: "Công ty ABC Bất Động Sản",
        description:
          "Chuyên môi giới nhà đất tại TP.HCM với hơn 15 năm kinh nghiệm và đội ngũ chuyên nghiệp.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0901234567",
      },
      {
        id: 2,
        name: "Công ty Địa Ốc Sài Gòn",
        description:
          "Cung cấp dịch vụ bất động sản toàn diện tại TP.HCM, tập trung vào phân khúc nhà phố và căn hộ cao cấp.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0987654321",
      },
      {
        id: 3,
        name: "123 Properties",
        description:
          "Dịch vụ mua bán và cho thuê nhà đất tại TP.HCM, uy tín với hàng nghìn khách hàng mỗi năm.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0912123456",
      },
      {
        id: 4,
        name: "Công ty Nam Long",
        description:
          "Chuyên phát triển các dự án căn hộ chung cư và đất nền tại TP.HCM với uy tín hàng đầu.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0932123456",
      },
      {
        id: 5,
        name: "Công ty Hưng Thịnh Land",
        description:
          "Hỗ trợ mua bán và đầu tư bất động sản, tập trung tại khu vực quận 7 và quận 9.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0945123456",
      },
      {
        id: 6,
        name: "Công ty BĐS Phú Mỹ Hưng",
        description:
          "Cung cấp các sản phẩm nhà ở và thương mại chất lượng cao tại khu đô thị Phú Mỹ Hưng.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0923123456",
      },
      {
        id: 7,
        name: "Công ty Địa Ốc Đại Nam",
        description:
          "Đại diện môi giới uy tín tại TP.HCM, với hơn 20 năm kinh nghiệm.",
        logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
        area: "TP.HCM",
        contactPhone: "0978123456",
      },

  ];

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hàm kiểm tra khi người dùng cuộn trang
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
                <h2 className="text-2xl font-bold pb-2">{company.name}</h2>
                <p className="text-gray-600 text-sm">{company.description}</p>
              </div>
            </div>

            <div className="bg-gray-100 p-6">
              <p className="font-semibold">Khu vực: {company.area}</p>
              <p className="text-sm text-gray-500">
                SĐT: {company.contactPhone}
              </p>
            </div>
          </div>
        ))}

        {showScrollTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition transform hover:scale-110 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Directory;
