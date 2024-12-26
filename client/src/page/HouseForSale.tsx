import { useState } from "react";
import MapView from "../components/MapView";
import { FaSearch } from "react-icons/fa";
import PostDetail from "../components/PostDetail";
// import PostDetail from "../components/PostDetail";

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

const HouseForSale = () => {
  const posts: Post[] = [
    {
      id: 1,
      title: "Nhà đất bán tại Quận 1, TP.HCM",
      description: "Căn nhà đẹp, vị trí thuận lợi, giá rẻ.",
      image:
        "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
      contactName: "Nguyễn Văn A",
      contactPhone: "0123456789",
      coordinates: { lat: 10.7769, lng: 106.7009 },
      price: "1 tỷ",
      area: "50m²",
      amenities: "Gần chợ, trường học",
    },
    {
      id: 2,
      title: "Nhà đất bán tại Quận 3, TP.HCM",
      description: "Căn nhà rộng rãi, gần chợ và trường học.",
      image:
        "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
      contactName: "Trần Thị B",
      contactPhone: "0987654321",
      coordinates: { lat: 10.7791, lng: 106.6847 },
      price: "1 tỷ",
      area: "50m²",
      amenities: "Gần chợ, trường học",
    },
    {
      id: 3,
      title: "Nhà đất bán tại Quận 5, TP.HCM",
      description: "Căn nhà đẹp, gần trung tâm, giá hấp dẫn.",
      image:
        "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
      contactName: "Lê Văn C",
      contactPhone: "0934567890",
      coordinates: { lat: 10.7765, lng: 106.6958 },
      price: "1 tỷ",
      area: "50m²",
      amenities: "Gần chợ, trường học",
    },

    // {
    //   id: 4,
    //   title: "Nhà đất bán tại Quận 2, TP.HCM",
    //   description: "Căn nhà đẹp, gần trung tâm, giá hấp dẫn.",
    //   image:
    //     "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    //   contactName: "Lê Văn C",
    //   contactPhone: "0934567890",
    //   coordinates: { lat: 10.7911, lng: 106.7483 },
    // },
    // {
    //   id: 5,
    //   title: "Nhà đất bán tại Quận 4, TP.HCM",
    //   description: "Căn nhà đẹp, gần trung tâm, giá hấp dẫn.",
    //   image:
    //     "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    //   contactName: "Lê Văn C",
    //   contactPhone: "0934567890",
    //   coordinates: { lat: 10.7622, lng: 106.6969 },
    // },
    // {
    //   id: 6,
    //   title: "Nhà đất bán tại Quận 9, TP.HCM",
    //   description: "Căn nhà đẹp, gần trung tâm, giá hấp dẫn.",
    //   image:
    //     "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg",
    //   contactName: "Lê Văn C",
    //   contactPhone: "0934567890",
    //   coordinates: { lat: 10.8321, lng: 106.8064 },
    // },
  ];

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null); // Theo dõi bài post được chọn
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null); // Theo dõi bài post đang hover

  const handlePostClick = (postId: number, coordinates: Coordinates) => {
    setSelectedPostId(postId); // Đánh dấu bài post được chọn
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Nếu click vào container mà không phải vào bài post, bỏ chọn
    const target = event.target as HTMLElement;
    if (!target.closest(".post-item")) {
      setSelectedPostId(null);
    }
  };

  const selectedPost = selectedPostId
    ? posts.find((post) => post.id === selectedPostId)
    : null;

  return (
    <div
      className="relative flex h-full w-full gap-2 p-4"
      onClick={handleContainerClick}
    >
      {/* Bài đăng (1/4) */}
      <div className="scrollbar-thin basis-1/3 overflow-y-scroll px-10">
        {posts.map((post) => (
          <div
            key={post.id}
            onMouseEnter={() => setHoveredPostId(post.id)} // Đánh dấu khi hover
            onMouseLeave={() => setHoveredPostId(null)} // Xóa hover khi rời chuột
            onClick={(e) => {
              e.stopPropagation(); // Ngăn chặn sự kiện click lan ra container
              handlePostClick(post.id, post.coordinates);
            }}
            className={`post-item mb-4 cursor-pointer border-b pb-4 transition last:border-none ${
              selectedPostId === post.id
                ? "bg-blue-100" // Màu khi được chọn
                : hoveredPostId === post.id
                  ? "bg-gray-100" // Màu khi hover
                  : "bg-white" // Màu mặc định
            }`}
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
              <p className="mb-4 text-gray-700">{post.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="font-semibold">{post.contactName}</p>
                    <p className="text-sm text-gray-500">
                      SĐT: {post.contactPhone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                    handlePostClick(post.id, post.coordinates);
                  }}
                  className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  <FaSearch className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mapbox (chiếm 3/4) */}
      <MapView
        selectedCoordinates={
          selectedPostId
            ? posts.find((post) => post.id === selectedPostId)?.coordinates ||
              null
            : null
        }
      />
      {/* </div> */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

export default HouseForSale;
