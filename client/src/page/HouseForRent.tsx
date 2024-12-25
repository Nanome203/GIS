
import  { useState, useEffect } from 'react';

const HouseForRent = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const posts = [
    {
      id: 1,
      title: 'Nhà đất cho thuê tại Quận 1, TP.HCM',
      description: 'Căn nhà đẹp, vị trí thuận lợi, giá rẻ.',
      image: 'https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/nha%20mai%20thai%202%20tang/nha-mai-thai-2-tang-14.jpg',
      contactName: 'Nguyễn Văn A',
      contactPhone: '0123456789',
    },
    {
      id: 2,
      title: 'Nhà đất cho thuê tại Quận 3, TP.HCM',
      description: 'Căn nhà rộng rãi, gần chợ và trường học.',
      image: 'https://images.unsplash.com/photo-1511918984144-b8a32fd5d570',
      contactName: 'Trần Thị B',
      contactPhone: '0987654321',
    },
    {
      id: 3,
      title: 'Nhà đất cho thuê tại Quận 7, TP.HCM',
      description: 'Nhà mới xây, không gian sống thoải mái.',
      image: 'https://images.unsplash.com/photo-1570744542181-cb95d0f63a1b',
      contactName: 'Lê Văn C',
      contactPhone: '0912345678',
    },
    {
      id: 4,
      title: 'Nhà đất cho thuê tại Quận 10, TP.HCM',
      description: 'Nhà nằm gần các tiện ích công cộng.',
      image: 'https://images.unsplash.com/photo-1511918984144-b8a32fd5d570',
      contactName: 'Phan Thị D',
      contactPhone: '0934567890',
    },
    {
      id: 5,
      title: 'Nhà đất cho thuê tại Quận 4, TP.HCM',
      description: 'Vị trí giao thông thuận lợi, giá hợp lý.',
      image: 'https://images.unsplash.com/photo-1570744542181-cb95d0f63a1b',
      contactName: 'Võ Minh E',
      contactPhone: '0986123456',
    },
  ];


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

 
  const handleScroll = () => {
    if (window.scrollY > 300) {  
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-8">

        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>

              <div className="flex items-center space-x-4">

                <img
                  src="https://i.pravatar.cc/40"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold">{post.contactName}</p>
                  <p className="text-sm text-gray-500">SĐT: {post.contactPhone}</p>
                </div>
              </div>
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

export default HouseForRent;
