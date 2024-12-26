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
interface DatBanData {
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

interface PostDetailProps {
  post: DatBanData;
  onClose: () => void;
}

function PostDetail({ post, onClose }: PostDetailProps) {
  return (
    <div className="relative h-full w-1/3 overflow-auto bg-white p-6 shadow-lg animate-in slide-in-from-right">
      {/* Nút đóng */}
      <button
        className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
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
            // onClick={() => alert(`Gửi email cho ${post.contactName}`)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Gửi email
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
