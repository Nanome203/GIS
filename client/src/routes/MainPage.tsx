
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Directory from "../page/Directory";
import HouseForSale from "../page/HouseForSale"
import HouseForRent from "../page/HouseForRent"

// import MapView from "../components/MapView";

function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header /> 
      <div className="my-4">

      </div>
      <Router>
      <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<HouseForSale />} />
                <Route path="/house-for-rent" element={<HouseForRent />} />
                {/* <Route path="/analysis" element={<Analysis />} /> */}
                <Route path="/directory" element={<Directory />} />
              </Routes>
            </div>
      </Router>

      <div className="flex-1 overflow-hidden"> 
        {/* <MapView /> */}
      </div>
      <Footer /> 
    </div>
  );
}

export default MainPage;
