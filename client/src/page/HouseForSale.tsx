import React, { useContext, useEffect, useState } from "react";
import MapView from "../components/MapView";
import PostDetail from "../components/PostDetail";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import FaHeart
import supabase from "../utils/supabase";
import { context } from "../utils/context";

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
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapRef, setMapRef] = useState<mapboxgl.Map | null>(null);
  const [savedDatBan, setSavedDatBan] = useState<string[]>([]);

  const selectedPost = fetchedData.find((post) => post.id === selectedPostId);
  const coordinates =
    selectedPost?.lat && selectedPost?.lng
      ? { lat: selectedPost.lat, lng: selectedPost.lng }
      : null;

  const contextData = useContext(context);
  if (!contextData) {
    return;
  }
  const { id: userId } = contextData;

  function handlePostClick(postId: string) {
    setSelectedPostId(postId);
  }

  async function handleUnSavePost(id: string) {
    const { error } = await supabase
      .from("save_dat_ban")
      .delete()
      .eq("dat_ban_id", id);
    if (error) {
      console.error(error.message);
      return;
    }
    fetchData();
    fetchSavedDatBan();
  }
  async function handleSavePost(id: string) {
    const { error } = await supabase
      .from("save_dat_ban")
      .insert([{ profile_id: userId, dat_ban_id: id }]);
    if (error) {
      console.error(error.message);
      return;
    }
    fetchData();
    fetchSavedDatBan();
  }

  // fetch all dat_ban data
  async function fetchData() {
    const { data, error } = await supabase.from("dat_ban").select("*");
    if (error) {
      console.log("Error fetching data:", error);
    } else {
      setFetchedData(data);
    }
  }

  async function fetchSavedDatBan() {
    const { data, error } = await supabase
      .from("save_dat_ban")
      .select("dat_ban_id")
      .eq("profile_id", userId);
    if (error) {
      console.error(error.message);
      return;
    }
    const dummySavedDatBanArray: string[] = [];
    data.forEach((element) => {
      dummySavedDatBanArray.push(element.dat_ban_id);
    });
    setSavedDatBan(dummySavedDatBanArray);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchData();
    fetchSavedDatBan();
  }, [userId]);

  return (
    <div className="relative flex h-full w-full gap-2 p-4">
      {/* Bài đăng */}
      <div className="scrollbar-thin basis-1/3 overflow-y-scroll px-10">
        {fetchedData.map((post) => (
          <div
            key={post.id}
            onMouseEnter={() => setHoveredPostId(post.id)}
            onMouseLeave={() => setHoveredPostId(null)}
            onClick={(e) => {
              e.stopPropagation();
              handlePostClick(post.id);
            }}
            className={`post-item mb-4 cursor-pointer border-b pb-4 transition last:border-none ${
              selectedPostId === post.id
                ? "bg-blue-100"
                : hoveredPostId === post.id
                  ? "bg-gray-100"
                  : "bg-white"
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
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-semibold">{post.contactName}</p>
                    <p className="text-sm text-gray-500">SĐT: {post.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* Nút Lưu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (savedDatBan.includes(post.id)) {
                        handleUnSavePost(post.id);
                        return;
                      }
                      handleSavePost(post.id);
                    }}
                    className="rounded-full p-2 hover:bg-gray-300"
                  >
                    {savedDatBan.includes(post.id) ? (
                      <FaBookmark className="text-xl" />
                    ) : (
                      <FaRegBookmark className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mapbox */}
      <MapView
        selectedCoordinates={coordinates}
        setUserLocation={setUserLocation}
        setMapRef={setMapRef}
      />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
          start={userLocation}
          end={coordinates}
          mapRef={mapRef}
        />
      )}
    </div>
  );
}

export default HouseForSale;
