import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
// import { FaSearch } from "react-icons/fa";
import PostDetail from "../components/PostDetail";
import { FaSearch } from "react-icons/fa";
import supabase from "../utils/supabase";

interface DatData {
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

function HouseForSale() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<DatData[]>([]);
  const selectedPost = fetchedData.find((post) => post.id === selectedPostId);
  const coordinates =
    selectedPost?.lat && selectedPost?.lng
      ? { lat: selectedPost.lat, lng: selectedPost.lng }
      : null;
  function handlePostClick(postId: string) {
    setSelectedPostId(postId);
  }

  // function handleClosePostDetail() {
  //   setSelectedPostId(null); // Đóng detail
  // }

  // const selectedPost = selectedPostId
  //   ? fetchedData.find((post) => post.id === selectedPostId)
  //   : null;

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("dat_ban").select("*");
      if (error) {
        console.log("error", error);
      } else {
        setFetchedData(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div
      className="relative flex h-full w-full gap-2 p-4"
      // onClick={handleClosePostDetail}
    >
      {/* Bài đăng (1/4) */}
      <div className="scrollbar-thin basis-1/3 overflow-y-scroll px-10">
        {fetchedData.map((post) => (
          <div
            key={post.id}
            onMouseEnter={() => setHoveredPostId(post.id)} // Đánh dấu khi hover
            onMouseLeave={() => setHoveredPostId(null)} // Xóa hover khi rời chuột
            onClick={(e) => {
              e.stopPropagation(); // Ngăn chặn sự kiện click lan ra container
              handlePostClick(post.id);
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
              src={post.imageUrl}
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
                    <p className="text-sm text-gray-500">SĐT: {post.phone}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                    handlePostClick(post.id);
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
      <MapView selectedCoordinates={coordinates} />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
}

export default HouseForSale;
