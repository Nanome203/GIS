import {
  FaBed,
  FaMapMarkerAlt,
  FaTimes,
  FaUser,
  FaPhoneAlt,
} from "react-icons/fa";

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

// interface Post {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   contactName: string;
//   contactPhone: string;
//   price: string;
//   area: string;
//   amenities: string;
//   coordinates: Coordinates;
// }
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
type Coordinates = {
  lat: number;
  lng: number;
};
interface PostDetailProps {
  post: DatData;
  onClose: () => void;
  start: Coordinates | null;
  end: Coordinates | null;
  mapRef: mapboxgl.Map | null;
}

function PostDetail({ post, onClose, start, end, mapRef }: PostDetailProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addRouteToMap = (route: any) => {
    if (mapRef?.getLayer("route")) {
      mapRef?.removeLayer("route");
      mapRef?.removeSource("route");
    }
    mapRef?.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: route },
        },
      },
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#3887be", "line-width": 5 },
    });
  };

  const calculateRoute = (
    start: Coordinates | null,
    end: Coordinates | null,
  ) => {
    if (start === null) {
      alert("Không thể tính nếu chưa biết vị trí người dùng");
      return;
    }
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start?.lng},${start?.lat};${end?.lng},${end?.lat}?geometries=geojson&access_token=pk.eyJ1IjoidGlob25kYW5neWV1MDEwMiIsImEiOiJjbTUxNjdobzkxdXY5MmtwdHMwN3YxcnozIn0.yIZMRN-2uvkr9vz92_45Ig`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry.coordinates;
        addRouteToMap(route);
      })
      .catch((error) => console.error("Error fetching directions:", error));
  };
  return (
    <div className="relative h-full w-1/3 overflow-auto rounded-xl border-2 border-gray-200 bg-white p-6 shadow-xl animate-in slide-in-from-right">
      {/* Nút đóng */}
      <button
        className="absolute right-1 top-1 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Post Content */}
      <div className="space-y-4">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-48 w-full rounded-lg object-cover shadow-md"
        />
        <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
        <p className="mb-4 text-gray-700">{post.description}</p>

        {/* Thêm chi tiết như diện tích, giá, tiện ích */}
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Giá bán: {post.price.toLocaleString()} VND
          </p>
          {/* <p className="text-lg font-semibold">Diện tích: {post.area}</p>
          <p className="text-lg font-semibold">Tiện ích: {post.amenities}</p> */}
        </div>

        <div className="mb-2 flex items-center space-x-2">
          <FaBed className="text-gray-600" />
          <p>
            <strong>Diện tích: </strong>
            {post.area} m<sup>2</sup>
          </p>
        </div>

        <div className="mb-2 flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p className="font-semibold">{post.address}</p>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <FaUser className="text-gray-600" />
          <p className="font-semibold">Người liên hệ: {post.contactName}</p>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <FaPhoneAlt className="text-gray-600" />
          <p className="font-semibold"> {post.phone}</p>
        </div>

        {/* Vị trí */}
        {/* <div className="mb-4">
          <p className="text-lg font-semibold">Địa chỉ: {post.address}</p>
        </div> */}

        {/* Các nút liên hệ */}
        <div className="flex space-x-4">
          <button
            onClick={() => alert(`Gọi cho ${post.phone}`)}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Gọi
          </button>
          <button
            onClick={() => calculateRoute(start, end)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Tìm đường
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
