import React, { useState } from "react";
import MapView from "../components/MapView";
// import { FaSearch } from "react-icons/fa";
import PostDetail from "../components/PostDetail";

const posts = [
  {
    id: 1,
      title: "ĐẤT MẶT TIỀN QUẬN 1, TP.HCM",
      description: "Đất thương mại dịch vụ, đã có sổ, vị trí mặt tiền, ngay trung tâm.",
      image:
        "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
      contactName: "Nguyễn Văn An",
      contactPhone: "0956229740",
      coordinates: { lat: 10.7769, lng: 106.7009 }, 
      price: "1 tỷ",
      area: "50m²",
      amenities: "Gần chợ, trường học, các cửa hàng tiện lợi"
  },
  {
    id: 2,
    title: "Nhà đất bán tại Quận 3, TP.HCM",
    description: "Căn nhà rộng rãi, gần chợ và trường học.",
    image:
      "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    contactName: "Nhà đất Trần Văn",
    contactPhone: "0987654321",
    coordinates: { lat: 10.7791, lng: 106.6847 },
    price: "2 tỷ",
    area: "70m²",
    amenities: "Gần chợ, trường học",
  },
  {
    id: 3,
    title: "Nhà đất bán tại Bình Thạnh, TP.HCM",
    description: "Căn hộ gần trung tâm, view sông thoáng mát.",
    image:
      "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    contactName: "Lê Minh Cường",
    contactPhone: "0988112233",
    coordinates: { lat: 10.8039, lng: 106.7074 },
    price: "3.5 tỷ",
    area: "120m²",
    amenities: "Gần sông, khu dân cư yên tĩnh",
  },
  {
    id: 4,
    title: "Đất nền Khu đô thị mới tại Quận 9, TP.HCM",
    description: "Khu đất nền đẹp, hạ tầng hoàn thiện.",
    image:
      "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    contactName: "Phạm Thu Hà",
    contactPhone: "0934567890",
    coordinates: { lat: 10.8458, lng: 106.7857 },
    price: "900 triệu",
    area: "100m²",
    amenities: "Gần khu công nghệ cao, đường lớn",
  },
  {
    id: 5,
    title: "Biệt thự ven biển tại Vũng Tàu",
    description: "Biệt thự đẳng cấp, gần biển, thích hợp nghỉ dưỡng.",
    image:
      "https://kientrucsuvietnam.vn/wp-content/uploads/2020/03/mau-biet-thu-nghi-duong-ven-bien-5.jpg",
    contactName: "Nguyễn Hải Dương",
    contactPhone: "0909123456",
    coordinates: { lat: 10.3451, lng: 107.0843 },
    price: "12 tỷ",
    area: "300m²",
    amenities: "Gần biển, có hồ bơi, an ninh cao",
  },
  {
    id: 6,
    title: "Nhà phố tại Quận 7, TP.HCM",
    description: "Nhà phố tiện nghi, gần trung tâm thương mại.",
    image:
      "https://kientrucsuvietnam.vn/wp-content/uploads/2018/06/thiet-ke-nha-pho-mat-tien-6m-600x450.jpg",
    contactName: "Hoàng Thị Mai",
    contactPhone: "0912123456",
    coordinates: { lat: 10.7386, lng: 106.7079 },
    price: "5 tỷ",
    area: "90m²",
    amenities: "Gần siêu thị, bệnh viện, trường học",
  },
  {
    id: 7,
    title: "Đất thổ cư tại Thủ Đức, TP.HCM",
    description: "Đất thổ cư vị trí đẹp, pháp lý rõ ràng.",
    image:
      "https://cdn.batdongsan.com.vn/crop/180x135/20211212083750-863d_wm.jpg",
    contactName: "Trần Quốc Huy",
    contactPhone: "0919988777",
    coordinates: { lat: 10.8500, lng: 106.7700 },
    price: "1.8 tỷ",
    area: "80m²",
    amenities: "Gần trường đại học, giao thông thuận tiện",
  },
  
];
function HouseForSale() {
  

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);

  function handlePostClick(postId: number) {
    setSelectedPostId(postId);
  }

  function handleClosePostDetail() {
    setSelectedPostId(null); // Đóng detail
  }

  const selectedPost = selectedPostId
    ? posts.find((post) => post.id === selectedPostId)
    : null;

  return (
    <div className="w-full h-screen flex flex-col" >
      {/* Nội dung chính */}
      <div className="pt-[64px] h-full flex">
        {/* Sidebar bài Post */}
        <div className="w-1/4 bg-gray-100 overflow-auto scrollbar-thin max-h-[calc(100vh-64px)]">
          {posts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => setHoveredPostId(post.id)}
              onMouseLeave={() => setHoveredPostId(null)}
              onClick={(e) => {
                e.stopPropagation();
                handlePostClick(post.id);
              }}
              className={`post-item mb-4 border-b last:border-none pb-4 cursor-pointer transition ${
                selectedPostId === post.id
                  ? "bg-blue-100"
                  : hoveredPostId === post.id
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
            >
              <div className = "relative w-full h-40 overflow-hidden">
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-36 object-cover"
              />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm  text-gray-700 mb-4 ">{post.description}</p>
                

                {/* Sđt, tên người dùng */}
                <div className="flex items-center space-x-4">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm text-gray-600">
                      {post.contactName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {post.contactPhone}
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mapbox */}
        <div className="flex-grow bg-gray-200 flex items-center justify-center max-h-[calc(100vh-64px)] relative z-0">
          <MapView
            selectedCoordinates={
              selectedPostId
                ? posts.find((post) => post.id === selectedPostId)?.coordinates || null
                : null
            }
          />
        </div>
      </div>

      {/* Post Detail */}
      <section
  className={`fixed top-[90px] bottom-0 right-0 w-1/3 bg-white shadow-lg transform transition-transform duration-500 ${
    selectedPostId ? "translate-x-0" : "translate-x-full"
  }`}

>
  {selectedPost && (
    <PostDetail 
    post={selectedPost} 
    onClose={handleClosePostDetail} />
  )}
</section>
    </div>
  );
}

export default HouseForSale;
