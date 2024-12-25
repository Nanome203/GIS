import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set AccessToken cho Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoidGlob25kYW5neWV1MDEwMiIsImEiOiJjbTUxNjdobzkxdXY5MmtwdHMwN3YxcnozIn0.yIZMRN-2uvkr9vz92_45Ig";

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapViewProps {
  selectedCoordinates: Coordinates | null;
}

const MapView: React.FC<MapViewProps> = ({ selectedCoordinates }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null); // Kiểu Mapbox rõ ràng
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null); // Để lưu trữ marker

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: selectedCoordinates ? [selectedCoordinates.lng, selectedCoordinates.lat] : [108.2772, 14.0583],
      zoom: 10,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []); // Chỉ tạo bản đồ một lần khi component mount

  useEffect(() => {
    if (selectedCoordinates && map) {
      // Xóa marker cũ nếu có
      if (marker) {
        marker.remove();
      }

      // Tạo marker mới và thêm vào bản đồ
      const newMarker = new mapboxgl.Marker()
        .setLngLat([selectedCoordinates.lng, selectedCoordinates.lat])
        .addTo(map);

      setMarker(newMarker);
      
      // Di chuyển bản đồ đến vị trí của marker
      map.flyTo({
        center: [selectedCoordinates.lng, selectedCoordinates.lat],
        essential: true,
        zoom: 14, // Zoom vào
      });
    }
  }, [selectedCoordinates, map]); // Cập nhật khi selectedCoordinates thay đổi

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );  
};

export default MapView;
