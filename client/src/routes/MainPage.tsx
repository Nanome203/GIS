import { useNavigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { context } from "../utils/context";

// import MapView from "../components/MapView";

function MainPage() {
  const navigate = useNavigate();
  const contextData = useContext(context);
  if (contextData === null) {
    throw new Error("useContext must be inside a Provider with a value");
  }
  const { session } = contextData;
  useEffect(() => {
    if (session === null) {
      navigate("/authentication");
    }
  }, [session, navigate]);
  return (
    <>
      {session !== null ? (
        <div className="flex h-screen flex-col">
          <Header />
          <div className="my-4"></div>

          <div className="container mx-auto p-4">
            <Outlet />
          </div>
          <div className="flex-1 overflow-hidden">{/* <MapView /> */}</div>
          <Footer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MainPage;
