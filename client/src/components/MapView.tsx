import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = "pk.eyJ1IjoidGlob25kYW5neWV1MDEwMiIsImEiOiJjbTUxNjdobzkxdXY5MmtwdHMwN3YxcnozIn0.yIZMRN-2uvkr9vz92_45Ig";

function MapView() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", 
      style: "mapbox://styles/mapbox/streets-v11", 
      center: [108.2772, 14.0583], 
      zoom: 6, 
    });

    return () => map.remove(); 
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default MapView;
